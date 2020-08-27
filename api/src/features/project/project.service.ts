import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Project } from './project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) { }

    public async getProjects(): Promise<Project[]> {
        return await this.projectRepository
            .createQueryBuilder('p')
            .getMany();
    }
}