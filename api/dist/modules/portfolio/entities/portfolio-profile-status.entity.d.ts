import { Id } from '@api/core/database/entity.service';
import { PortfolioProfile } from './portfolio-profile.entity';
export declare class PortfolioProfileStatus {
    constructor(partial: Partial<PortfolioProfileStatus>);
    id?: Id;
    status: string;
    profiles: PortfolioProfile[];
}
