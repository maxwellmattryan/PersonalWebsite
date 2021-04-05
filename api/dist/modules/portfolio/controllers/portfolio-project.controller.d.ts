import { Id } from '@api/core/database/entity.service';
import { PortfolioProfileService } from '../services/portfolio-profile.service';
import { PortfolioProject } from '../entities/portfolio-project.entity';
import { PortfolioProjectService } from '../services/portfolio-project.service';
export declare class PortfolioProjectController {
    private readonly profileService;
    private readonly projectService;
    constructor(profileService: PortfolioProfileService, projectService: PortfolioProjectService);
    getProjects(): Promise<PortfolioProject[]>;
    createProject(projectData: PortfolioProject): Promise<PortfolioProject>;
    getProject(id: Id): Promise<PortfolioProject>;
    updateProject(id: Id, projectData: PortfolioProject): Promise<PortfolioProject>;
    deleteProject(id: Id): Promise<void>;
}
