import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PortfolioProfileTechnology } from '../entities/portfolio-profile-technology.entity';

@Injectable()
export class PortfolioProfileTechnologyService {
    constructor(
        @InjectRepository(PortfolioProfileTechnology)
        private readonly portfolioProfileTechnologyRepository: Repository<PortfolioProfileTechnology>
    ) { }

    public async deleteTechnologies(profileId: number): Promise<void> {
        await this.portfolioProfileTechnologyRepository
            .createQueryBuilder()
            .delete()
            .from(PortfolioProfileTechnology)
            .where('profile_technology.profile_id = :id', { id: profileId })
            .execute();
    }

    public async getTechnologies(profileId: number): Promise<PortfolioProfileTechnology[]> {
        return await this.portfolioProfileTechnologyRepository
            .createQueryBuilder('pt')
            .leftJoinAndSelect('pt.profile', 'p')
            .where('p.id = :id', { id: profileId })
            .orderBy('pt.display_order', 'ASC')
            .getMany();
    }
}