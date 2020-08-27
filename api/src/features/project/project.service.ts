import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCode } from '@api/core/database/postgres-error-code.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';
import { ProjectAlreadyExistsException } from './project.exception';

import { Project } from './project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) { }

    public async createProject(projectData: Project): Promise<Project> {
        const project: Project = await this.projectRepository.create(projectData);

        // TODO: Should I change to the query builder (also in admin registration)
        return await this.projectRepository.save(project)
            .catch((error) => {
                if(error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
                    throw new ProjectAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });
    }

    public async getProject(id: number): Promise<Project> {
        return await this.projectRepository
            .createQueryBuilder('p')
            .where('p.id = :id', { id: id })
            .getOne();
    }

    public async getProjects(): Promise<Project[]> {
        return await this.projectRepository
            .createQueryBuilder('p')
            .getMany();
    }

    public async updateProject(projectData: Project): Promise<Project> {
        await this.projectRepository.update(projectData.id, projectData);

        return this.getProject(projectData.id);
    }
}