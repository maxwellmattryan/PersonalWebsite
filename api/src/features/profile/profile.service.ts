import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Profile } from './profile.entity';
import { ProfileStatus } from './profile-status.entity';
import { ProfileTechnology } from './profile-technology.entity';
import { PostgresErrorCode } from '@api/core/database/postgres-error-code.enum';
import { ProjectAlreadyExistsException } from '@api/features/project/project.exception';
import { InternalServerErrorException } from '@api/core/http/http.exception';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
        @InjectRepository(ProfileStatus)
        private readonly profileStatusRepository: Repository<ProfileStatus>,
        @InjectRepository(ProfileTechnology)
        private readonly profileTechnologyRepository: Repository<ProfileTechnology>
    ) { }

    public async existsInTable(id: number): Promise<boolean> {
        return await this.profileRepository
            .createQueryBuilder('p')
            .where(`p.id = ${id}`)
            .getCount() > 0;
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

    public async getProfileTechnologies(id: number): Promise<ProfileTechnology[]> {
        return (await this.profileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.technologies', 'pt')
            .where('p.id = :id', { id: id })
            .getOne()).technologies;
    }

    public async getStatuses(): Promise<ProfileStatus[]> {
        return await this.profileStatusRepository
            .createQueryBuilder('ps')
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

        await this.deleteProfileTechnologies(id);

        await this.profileRepository.save(profileData);

        return await this.getProfile(id);
    }

    private async deleteProfileTechnologies(profileId: number): Promise<void> {
        await this.profileTechnologyRepository
            .createQueryBuilder()
            .delete()
            .from(ProfileTechnology)
            .where('profile_technology.profile_id = :id', { id: profileId })
            .execute();
    }
}