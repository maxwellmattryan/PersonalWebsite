import { Id } from '@api/core/database/entity.service';
import { PortfolioProfileStatus } from './portfolio-profile-status.entity';
import { PortfolioProfileTechnology } from './portfolio-profile-technology.entity';
import { PortfolioProject } from './portfolio-project.entity';
export declare class PortfolioProfile {
    constructor(partial: Partial<PortfolioProfile>);
    id?: Id;
    status: PortfolioProfileStatus;
    technologies: PortfolioProfileTechnology[];
    projects: PortfolioProject[];
    name: string;
    tagline: string;
    landing: string;
    about: string;
    image_url: string;
    created_at?: Date;
    updated_at?: Date;
}
