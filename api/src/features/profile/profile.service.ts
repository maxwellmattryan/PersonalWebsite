import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ) { }

    public async existsInTable(id: number): Promise<boolean> {
        return await this.profileRepository
            .createQueryBuilder('p')
            .where(`p.id = ${id}`)
            .getCount() > 0;
    }

    public async getActiveProfile(): Promise<Profile> {
        return await this.profileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.technologies', 'pt')
            .leftJoinAndSelect('p.status', 'ps')
            .where('ps.status = \'ACTIVE\'')
            .getOne();
    }

    public async getProfile(id: number): Promise<Profile> {
        return await this.profileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.status', 'ps')
            .where('p.id = :id', { id: id })
            .getOne();
    }

    public async getProfiles(): Promise<Profile[]> {
        return await this.profileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.status', 'ps')
            .getMany();
    }

    public async getProfilesForProject(projectId: number): Promise<Profile[]> {
        return await this.profileRepository.query(`
            SELECT p.* FROM profile p
            LEFT JOIN project_profile_mapping ppm ON p.id = ppm.profile_id
            WHERE ppm.project_id = ${projectId}
        `);
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
}