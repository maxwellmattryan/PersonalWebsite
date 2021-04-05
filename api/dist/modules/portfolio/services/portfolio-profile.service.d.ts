import { Repository } from 'typeorm';
import { EntityService, Id } from '@api/core/database/entity.service';
import { PortfolioProfile } from '../entities/portfolio-profile.entity';
import { PortfolioProfileStatusService } from './portfolio-profile-status.service';
import { PortfolioProfileTechnologyService } from './portfolio-profile-technology.service';
export declare class PortfolioProfileService extends EntityService<PortfolioProfile> {
    private readonly portfolioProfileRepository;
    private readonly portfolioProfileStatusService;
    private readonly portfolioProfileTechnologyService;
    constructor(portfolioProfileRepository: Repository<PortfolioProfile>, portfolioProfileStatusService: PortfolioProfileStatusService, portfolioProfileTechnologyService: PortfolioProfileTechnologyService);
    existsInTable(id: Id): Promise<boolean>;
    createProfile(profileData: PortfolioProfile): Promise<PortfolioProfile>;
    deleteProfile(id: Id): Promise<void>;
    getProfile(id: Id): Promise<PortfolioProfile>;
    getProfileByStatus(status: string): Promise<PortfolioProfile>;
    getProfiles(): Promise<PortfolioProfile[]>;
    resetProfileStatuses(activeId: Id): Promise<void>;
    updateProfile(id: Id, profileData: PortfolioProfile): Promise<PortfolioProfile>;
}
