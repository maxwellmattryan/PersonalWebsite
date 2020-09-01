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

    public async existsInTable(id: number): Promise<boolean> {
        return await this.projectRepository
            .createQueryBuilder('p')
            .where('p.id = :id', { id: id })
            .getCount() > 0;
    }

    public async createProject(projectData: Project): Promise<Project> {
        const project: Project = this.projectRepository.create(projectData);
        return await this.projectRepository.save(project)
            .catch((error) => {
                if(error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
                    throw new ProjectAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });
    }

    public async deleteProject(id: number): Promise<void> {
        await this.projectRepository
            .createQueryBuilder()
            .delete()
            .from(Project)
            .where('project.id = :id', { id: id })
            .execute();
    }

    public async getProject(id: number): Promise<Project> {
        return await this.projectRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.profiles', 'prf')
            .where('p.id = :id', { id: id })
            .getOne();
    }

    public async getProjectsForProfile(profileId: number): Promise<Project[]> {
        return await this.projectRepository
            .createQueryBuilder('p')
            .innerJoinAndSelect('p.profiles', 'prf')
            .where('prf.id = :id', { id: profileId })
            .getMany();
    }

    public async updateProject(id: number, projectData: Project): Promise<Project> {
        await this.projectRepository.save(projectData);

        return await this.getProject(id);
    }
}