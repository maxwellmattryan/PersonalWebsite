import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService, Id } from '@api/core/database/entity.service';

import { PortfolioProfileTechnology } from '../entities/portfolio-profile-technology.entity';

@Injectable()
export class PortfolioProfileTechnologyService extends EntityService<PortfolioProfileTechnology> {
    constructor(
        @InjectRepository(PortfolioProfileTechnology)
        private readonly portfolioProfileTechnologyRepository: Repository<PortfolioProfileTechnology>
    ) { super(); }

    public async deleteTechnologies(profileId: Id): Promise<void> {
        await this.portfolioProfileTechnologyRepository
            .createQueryBuilder()
            .delete()
            .from(PortfolioProfileTechnology)
            .where('portfolio_profile_technology.profile_id = :id', { id: profileId })
            .execute();
    }

    public async getTechnologies(profileId: Id): Promise<PortfolioProfileTechnology[]> {
        return this.portfolioProfileTechnologyRepository
            .createQueryBuilder('pt')
            .leftJoinAndSelect('pt.profile', 'p')
            .where('p.id = :id', { id: profileId })
            .orderBy('pt.display_order', 'ASC')
            .getMany();
    }
}
