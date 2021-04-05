import { Id } from '@api/core/database/entity.service';
import { PortfolioProfile } from './portfolio-profile.entity';
export declare class PortfolioProject {
    constructor(partial: Partial<PortfolioProject>);
    id?: Id;
    profiles: PortfolioProfile[];
    name: string;
    tagline: string;
    description: string;
    image_url: string;
    link_name: string;
    link_url: string;
    created_at?: Date;
    updated_at?: Date;
}
