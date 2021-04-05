import { PortfolioProfileStatusService } from '../services/portfolio-profile-status.service';
import { PortfolioProfileStatus } from '../entities/portfolio-profile-status.entity';
export declare class PortfolioProfileStatusController {
    private readonly profileStatusService;
    constructor(profileStatusService: PortfolioProfileStatusService);
    getProfileStatuses(): Promise<PortfolioProfileStatus[]>;
}
