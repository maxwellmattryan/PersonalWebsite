import { Repository } from 'typeorm';
import { EntityService, Id } from '@api/core/database/entity.service';
import { PortfolioProject } from '../entities/portfolio-project.entity';
export declare class PortfolioProjectService extends EntityService<PortfolioProject> {
    private readonly portfolioProjectRepository;
    constructor(portfolioProjectRepository: Repository<PortfolioProject>);
    existsInTable(id: Id): Promise<boolean>;
    createProject(projectData: PortfolioProject): Promise<PortfolioProject>;
    deleteProject(id: Id): Promise<void>;
    getProject(id: Id): Promise<PortfolioProject>;
    getProjects(): Promise<PortfolioProject[]>;
    getProjectsForProfile(profileId: Id): Promise<PortfolioProject[]>;
    updateProject(id: Id, projectData: PortfolioProject): Promise<PortfolioProject>;
}
