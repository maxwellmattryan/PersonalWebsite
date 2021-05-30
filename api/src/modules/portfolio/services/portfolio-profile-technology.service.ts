import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService, Id } from '@api/core/database/entity.service';

import { PortfolioProfileTechnology } from '../entities/portfolio-profile-technology.entity';
import { PortfolioProfile } from '@api/modules/portfolio/entities/portfolio-profile.entity';

@Injectable()
export class PortfolioProfileTechnologyService extends EntityService<PortfolioProfileTechnology> {
    constructor(
        @InjectRepository(PortfolioProfileTechnology)
        private readonly portfolioProfileTechnologyRepository: Repository<PortfolioProfileTechnology>
    ) { super(); }

    public async createTechnologies(technologyData: PortfolioProfileTechnology[], profileId: Id): Promise<unknown> {
        technologyData = technologyData.map(t => this.createEntity(
            new PortfolioProfileTechnology({
                ...t,
                profile: new PortfolioProfile({ id: profileId })
            }),
            ['name', 'display_order', 'profile']
        ));
        return this.portfolioProfileTechnologyRepository
            .createQueryBuilder()
            .insert()
            .into(PortfolioProfileTechnology)
            .values(technologyData)
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

    public async deleteTechnologies(profileId: Id): Promise<void> {
        await this.portfolioProfileTechnologyRepository
            .createQueryBuilder()
            .delete()
            .from(PortfolioProfileTechnology)
            .where('portfolio_profile_technology.profile_id = :id', { id: profileId })
            .execute();
    }
}
