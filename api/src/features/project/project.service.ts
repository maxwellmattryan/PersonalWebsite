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

    public async createProject(projectData: Project, profileData: number[]): Promise<Project> {
        const rawProfile: Project = await this.projectRepository.create(projectData);

        const profile = await this.projectRepository.save(rawProfile)
            .catch((error) => {
                if(error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
                    throw new ProjectAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });

        await this.createProjectProfileMappings(profile.id, profileData);

        return profile;
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