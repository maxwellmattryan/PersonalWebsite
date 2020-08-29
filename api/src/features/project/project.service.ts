import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCode } from '@api/core/database/postgres-error-code.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';
import { ProjectAlreadyExistsException } from './project.exception';

import { Project } from './project.entity';
import { ProjectProfileMapping } from './project-profile-mapping.entity';
import { Profile } from '@api/features/profile/profile.entity';
import { ProjectLink } from './project-link.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(ProjectLink)
        private readonly projectLinkRepository: Repository<ProjectLink>,
        @InjectRepository(ProjectProfileMapping)
        private readonly projectProfileMappingRepository: Repository<ProjectProfileMapping>
    ) { }

    public async existsInTable(id: number): Promise<boolean> {
        return await this.projectRepository
            .createQueryBuilder('p')
            .where(`p.id = ${id}`)
            .getCount() > 0;
    }

    public async createProject(projectData: Project, profileData: number[]): Promise<Project> {
        const rawProjectLink: ProjectLink = await this.projectLinkRepository.create(projectData.link);
        const projectLink = await this.projectLinkRepository.save(rawProjectLink);

        const rawProject: Project = await this.projectRepository.create({ ...projectData, link: projectLink });
        const project = await this.projectRepository.save(rawProject)
            .catch((error) => {
                if(error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
                    throw new ProjectAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });

        await this.createProjectProfileMappings(project.id, profileData);

        return project;
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
            .where('p.id = :id', { id: id })
            .getOne();
    }

    public async getProjects(): Promise<Project[]> {
        return await this.projectRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.link', 'pl')
            .getMany();
    }

    public async getProjectsForProfile(profileId: number): Promise<Project[]> {
        const profileIds: number[] = (await this.projectRepository.query(`
            SELECT p.id FROM project p
            LEFT JOIN project_profile_mapping ppm ON p.id = ppm.project_id
            WHERE ppm.profile_id = ${profileId}
        `)).map((p: Project) => { return p.id; });

        return await this.projectRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.link', 'pl')
            .where('p.id IN (:...profileIds)', { profileIds: profileIds })
            .getMany();
    }

    public async updateProject(projectData: Project, profileData: number[]): Promise<Project> {
        await this.deleteProjectProfileMappings(projectData.id);
        await this.createProjectProfileMappings(projectData.id, profileData);

        await this.projectRepository.update(projectData.id, projectData);
        await this.projectLinkRepository.update(projectData.link.id, projectData.link);

        return await this.getProject(projectData.id);
    }

    private async createProjectProfileMappings(projectId: number, profileIds: number[]): Promise<void> {
        await this.projectProfileMappingRepository
            .createQueryBuilder()
            .insert()
            .into(ProjectProfileMapping)
            .values(profileIds.map(profileId => {
                return new ProjectProfileMapping({
                    project: new Project({ id: projectId }),
                    profile: new Profile({ id: profileId })
                })}
            ))
            .execute();
    }

    private async deleteProjectProfileMappings(projectId: number): Promise<void> {
        await this.projectProfileMappingRepository
            .createQueryBuilder()
            .delete()
            .from(ProjectProfileMapping)
            .where(`project_id = ${projectId}`)
            .execute();
    }
}