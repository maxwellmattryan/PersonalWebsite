import { Repository } from 'typeorm';
import { EntityService } from '@api/core/database/entity.service';
import { PortfolioProfileStatus } from '../entities/portfolio-profile-status.entity';
export declare class PortfolioProfileStatusService extends EntityService<PortfolioProfileStatus> {
    private readonly portfolioProfileStatusRepository;
    constructor(portfolioProfileStatusRepository: Repository<PortfolioProfileStatus>);
    getStatuses(): Promise<PortfolioProfileStatus[]>;
}
