import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService, Id } from "@api/core/database/entity.service";
import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';

import { PortfolioProject } from '../entities/portfolio-project.entity';
import { PortfolioProjectAlreadyExistsException } from '../exceptions/portfolio-project.exception';

@Injectable()
export class PortfolioProjectService extends EntityService<PortfolioProject> {
    constructor(
        @InjectRepository(PortfolioProject)
        private readonly portfolioProjectRepository: Repository<PortfolioProject>
    ) { super(); }

    public async existsInTable(id: Id): Promise<boolean> {
        return await this.portfolioProjectRepository
            .createQueryBuilder('p')
            .where('p.id = :id', { id: id })
            .getCount() > 0;
    }

    public async createProject(projectData: PortfolioProject): Promise<PortfolioProject> {
        const project: PortfolioProject = this.createEntity(
            this.portfolioProjectRepository.create(projectData),
            ['name']
        );

        return this.portfolioProjectRepository.save(project)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
                    throw new PortfolioProjectAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });
    }

    public async deleteProject(id: Id): Promise<void> {
        await this.portfolioProjectRepository
            .createQueryBuilder()
            .delete()
            .from(PortfolioProject)
            .where('portfolio_project.id = :id', { id: id })
            .execute();
    }

    public async getProject(id: Id): Promise<PortfolioProject> {
        return this.portfolioProjectRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.profiles', 'prf')
            .where('p.id = :id', { id: id })
            .getOne();
    }

    public async getProjects(): Promise<PortfolioProject[]> {
        return this.portfolioProjectRepository
            .createQueryBuilder('p')
            .getMany();
    }

    public async getProjectsForProfile(profileId: Id): Promise<PortfolioProject[]> {
        return this.portfolioProjectRepository
            .createQueryBuilder('p')
            .innerJoinAndSelect('p.profiles', 'prf')
            .where('prf.id = :id', { id: profileId })
            .getMany();
    }

    public async updateProject(id: Id, projectData: PortfolioProject): Promise<PortfolioProject> {
        return this.portfolioProjectRepository.save(projectData);
    }
}
