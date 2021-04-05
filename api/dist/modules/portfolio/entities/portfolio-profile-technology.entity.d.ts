import { Id } from '@api/core/database/entity.service';
import { PortfolioProfile } from './portfolio-profile.entity';
export declare class PortfolioProfileTechnology {
    constructor(partial: Partial<PortfolioProfileTechnology>);
    id?: Id;
    profile: PortfolioProfile;
    name: string;
    display_order: number;
}
