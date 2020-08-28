import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCode } from '@api/core/database/postgres-error-code.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';
import { ProjectAlreadyExistsException } from './project.exception';

import { Project } from './project.entity';
import { ProjectProfileMapping } from './project-profile-mapping.entity';
import { Profile } from '@api/features/profile/profile.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(ProjectProfileMapping)
        private readonly projectProfileMappingRepository: Repository<ProjectProfileMapping>
    ) { }

    public async existsInTable(id: number): Promise<boolean> {
        return await this.projectRepository
            .createQueryBuilder('p')
            .where(`p.id = ${id}`)
            .getCount() > 0;
    }

    public async createProject(projectData: Project): Promise<Project> {
        const project: Project = await this.projectRepository.create(projectData);

        return await this.projectRepository.save(project)
            .catch((error) => {
                if(error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
                    throw new ProjectAlreadyExistsException();
                } else {
                    console.log(error);
                    throw new InternalServerErrorException();
                }
            });
    }

    public async deleteProject(id: number): Promise<void> {
        await this.projectRepository
            .createQueryBuilder()
            .delete()
            .from(Project)
            .where(`id = ${id}`)
            .execute();
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

    public async updateProject(projectData: Project, profileData: number[]): Promise<Project> {
        await this.projectProfileMappingRepository
            .createQueryBuilder()
            .delete()
            .from(ProjectProfileMapping)
            .where(`project_id = ${projectData.id}`)
            .execute();
        await this.projectProfileMappingRepository
            .createQueryBuilder()
            .insert()
            .into(ProjectProfileMapping)
            .values(profileData.map(profileId =>
                new ProjectProfileMapping({
                    project: new Project({ id: projectData.id }),
                    profile: new Profile({ id: profileId })
                })))
            .execute();

        await this.projectRepository.update(projectData.id, projectData);

        return await this.getProject(projectData.id);
    }
}