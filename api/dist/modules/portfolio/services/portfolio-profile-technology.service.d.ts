import { Repository } from 'typeorm';
import { EntityService, Id } from '@api/core/database/entity.service';
import { PortfolioProfileTechnology } from '../entities/portfolio-profile-technology.entity';
export declare class PortfolioProfileTechnologyService extends EntityService<PortfolioProfileTechnology> {
    private readonly portfolioProfileTechnologyRepository;
    constructor(portfolioProfileTechnologyRepository: Repository<PortfolioProfileTechnology>);
    createTechnologies(technologyData: PortfolioProfileTechnology[], profileId: Id): Promise<unknown>;
    getTechnologies(profileId: Id): Promise<PortfolioProfileTechnology[]>;
    deleteTechnologies(profileId: Id): Promise<void>;
}
