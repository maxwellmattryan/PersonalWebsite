import { Id } from '@api/core/database/entity.service';
import { PortfolioProfile } from '../entities/portfolio-profile.entity';
import { PortfolioProfileService } from '../services/portfolio-profile.service';
export declare class PortfolioProfileController {
    private readonly profileService;
    constructor(profileService: PortfolioProfileService);
    getProfiles(): Promise<PortfolioProfile[]>;
    createProfile(profileData: PortfolioProfile): Promise<PortfolioProfile>;
    updateProfile(id: Id, profileData: PortfolioProfile): Promise<PortfolioProfile>;
    deleteProfile(id: Id): Promise<void>;
    activateProfile(id: Id): Promise<PortfolioProfile>;
}
