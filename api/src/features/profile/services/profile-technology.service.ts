import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProfileTechnology } from '../entities/profile-technology.entity';

@Injectable()
export class ProfileTechnologyService {
    constructor(
        @InjectRepository(ProfileTechnology)
        private readonly profileTechnologyRepository: Repository<ProfileTechnology>
    ) { }

    public async deleteTechnologies(profileId: number): Promise<void> {
        await this.profileTechnologyRepository
            .createQueryBuilder()
            .delete()
            .from(ProfileTechnology)
            .where('profile_technology.profile_id = :id', { id: profileId })
            .execute();
    }

    public async getTechnologies(profileId: number): Promise<ProfileTechnology[]> {
        return await this.profileTechnologyRepository
            .createQueryBuilder('pt')
            .leftJoinAndSelect('pt.profile', 'p')
            .where('p.id = :id', { id: profileId })
            .orderBy('pt.display_order', 'ASC')
            .getMany();
    }
}