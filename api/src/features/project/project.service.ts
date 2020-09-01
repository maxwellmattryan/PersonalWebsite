import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCode } from '@api/core/database/postgres-error-code.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';
import { ProjectAlreadyExistsException } from './project.exception';

import { Project } from './project.entity';
import { ProjectLink } from './project-link.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(ProjectLink)
        private readonly projectLinkRepository: Repository<ProjectLink>
    ) { }

    public async existsInTable(id: number): Promise<boolean> {
        return await this.projectRepository
            .createQueryBuilder('p')
            .where('p.id = :id', { id: id })
            .getCount() > 0;
    }

    public async createProject(projectData: Project): Promise<Project> {
        const rawProjectLink: ProjectLink = this.projectLinkRepository.create(projectData.link);
        const projectLink = await this.projectLinkRepository.save(rawProjectLink);

        const rawProject: Project = this.projectRepository.create(projectData);
        return await this.projectRepository.save(rawProject)
            .catch((error) => {
                if(error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
                    throw new ProjectAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });
    }

    public async deleteProject(id: number): Promise<void> {
        const linkId: number = (await this.projectRepository
            .createQueryBuilder()
            .delete()
            .from(Project)
            .where('project.id = :id', { id: id })
            .returning('link_id')
            .execute()
        ).raw[0].link_id;

        await this.projectLinkRepository
            .createQueryBuilder()
            .delete()
            .from(ProjectLink)
            .where('project_link.id = :id', { id: linkId })
            .execute();
    }

    public async getProject(id: number): Promise<Project> {
        return await this.projectRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.link', 'pl')
            .leftJoinAndSelect('p.profiles', 'prf')
            .where('p.id = :id', { id: id })
            .getOne();
    }

    public async getProjectsForProfile(profileId: number): Promise<Project[]> {
        return await this.projectRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.link', 'pl')
            .innerJoinAndSelect('p.profiles', 'prf')
            .where('prf.id = :id', { id: profileId })
            .getMany();
    }

    public async updateProject(id: number, projectData: Project): Promise<Project> {
        await this.projectRepository.save(projectData);
        await this.projectLinkRepository.save(projectData.link);

        return await this.getProject(id);
    }
}