import { PortfolioProfileTechnology } from '../entities/portfolio-profile-technology.entity';
import { PortfolioProfileTechnologyService } from '../services/portfolio-profile-technology.service';
export declare class PortfolioProfileTechnologyController {
    private readonly profileTechnologyService;
    constructor(profileTechnologyService: PortfolioProfileTechnologyService);
    getProfileTechnologies(id: number): Promise<PortfolioProfileTechnology[]>;
}
