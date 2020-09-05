import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/exceptions/http.exception';
import { ProfileAlreadyExistsException } from '../exceptions/profile.exception';

import { Profile } from '../entities/profile.entity';
import { ProfileTechnologyService } from '@api/features/profile/services/profile-technology.service';
import { ProfileStatusService } from '@api/features/profile/services/profile-status.service';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
        private readonly profileStatusService: ProfileStatusService,
        private readonly profileTechnologyService: ProfileTechnologyService
    ) { }

    public async existsInTable(id: number): Promise<boolean> {
        return await this.profileRepository
            .createQueryBuilder('p')
            .where(`p.id = ${id}`)
            .getCount() > 0;
    }

    public async createProfile(profileData: Profile): Promise<Profile> {
        let profile: Profile = this.profileRepository.create(profileData);
        profile = await this.profileRepository.save(profile)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
                    throw new ProfileAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });

        if(profile.status.status === 'ACTIVE') await this.resetProfileStatuses(profile.id);

        return profile;
    }

    public async deleteProfile(id: number): Promise<void> {
        if(id == (await this.getProfileByStatus('ACTIVE')).id) {
            await this.resetProfileStatuses((await this.getProfileByStatus('INACTIVE')).id);
        }

        await this.profileTechnologyService.deleteTechnologies(id);

        await this.profileRepository
            .createQueryBuilder()
            .delete()
            .from(Profile)
            .where('profile.id = :id', { id: id })
            .execute();
    }

    public async getProfile(id: number): Promise<Profile> {
        return await this.profileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.technologies', 'pt')
            .leftJoinAndSelect('p.projects', 'prj')
            .leftJoinAndSelect('p.status', 'ps')
            .where('p.id = :id', { id: id })
            .getOne();
    }

    public async getProfileByStatus(status: string): Promise<Profile> {
        return await this.profileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.technologies', 'pt')
            .leftJoinAndSelect('p.status', 'ps')
            .leftJoinAndSelect('p.projects', 'prj')
            .where('ps.status = :status', { status: status })
            .getOne();
    }

    public async getProfiles(): Promise<Profile[]> {
        return await this.profileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.projects', 'prj')
            .leftJoinAndSelect('p.technologies', 'pt')
            .leftJoinAndSelect('p.status', 'ps')
            .getMany();
    }

    public async resetProfileStatuses(activeId: number): Promise<void> {
        // CAUTION: This query relies on the status to be set to 1 = 'ACTIVE' and 2 = 'INACTIVE'
        // CAUTION: This query modifies all rows so it is important that the id being used actually exists
        await this.profileRepository.query(`
            UPDATE profile
            SET status_id = CASE WHEN id = ${activeId} THEN 1 ELSE 2 END,
                updated_at = now();
        `);
    }

    public async updateProfile(id: number, profileData: Profile): Promise<Profile> {
        // CAUTION: Make sure to activate profile if it was set in the editor and / or verify that at least one profile is always active
        if(id == (await this.getProfileByStatus('ACTIVE')).id) {
            if(profileData.status.status === 'INACTIVE') {
                await this.resetProfileStatuses((await this.getProfileByStatus('INACTIVE')).id);
            }
        } else {
            if(profileData.status.status === 'ACTIVE') {
                await this.resetProfileStatuses(id);
            }
        }

        await this.profileTechnologyService.deleteTechnologies(id);

        await this.profileRepository.save(profileData);

        return await this.getProfile(id);
    }
}