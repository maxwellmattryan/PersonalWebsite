import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';

import { PortfolioProject } from '../entities/portfolio-project.entity';
import { PortfolioProjectAlreadyExistsException } from '../exceptions/portfolio-project.exception';

@Injectable()
export class PortfolioProjectService {
    constructor(
        @InjectRepository(PortfolioProject)
        private readonly portfolioProjectRepository: Repository<PortfolioProject>
    ) { }

    public async existsInTable(id: number): Promise<boolean> {
        return await this.portfolioProjectRepository
            .createQueryBuilder('p')
            .where('p.id = :id', { id: id })
            .getCount() > 0;
    }

    public async createProject(projectData: PortfolioProject): Promise<PortfolioProject> {
        const project: PortfolioProject = this.portfolioProjectRepository.create(projectData);
        return await this.portfolioProjectRepository.save(project)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
                    throw new PortfolioProjectAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });
    }

    public async deleteProject(id: number): Promise<void> {
        await this.portfolioProjectRepository
            .createQueryBuilder()
            .delete()
            .from(PortfolioProject)
            .where('portfolio_project.id = :id', { id: id })
            .execute();
    }

    public async getProject(id: number): Promise<PortfolioProject> {
        return await this.portfolioProjectRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.profiles', 'prf')
            .where('p.id = :id', { id: id })
            .getOne();
    }

    public async getProjects(): Promise<PortfolioProject[]> {
        return await this.portfolioProjectRepository
            .createQueryBuilder('p')
            .getMany();
    }

    public async getProjectsForProfile(profileId: number): Promise<PortfolioProject[]> {
        return await this.portfolioProjectRepository
            .createQueryBuilder('p')
            .innerJoinAndSelect('p.profiles', 'prf')
            .where('prf.id = :id', { id: profileId })
            .getMany();
    }

    public async updateProject(id: number, projectData: PortfolioProject): Promise<PortfolioProject> {
        await this.portfolioProjectRepository.save(projectData);

        return await this.getProject(id);
    }
}