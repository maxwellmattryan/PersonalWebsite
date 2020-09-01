import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileModule } from '@api/features/profile/profile.module';

import { Project } from './project.entity';
import { ProjectLink } from './project-link.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project, ProjectLink]),
        ProfileModule
    ],
    exports: [
        ProjectService
    ],
    controllers: [
        ProjectController
    ],
    providers: [
        ProjectService
    ]
})
export class ProjectModule { }