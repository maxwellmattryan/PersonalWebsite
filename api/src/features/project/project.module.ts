import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './project.entity';
import { ProjectProfileMapping } from './project-profile-mapping.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project, ProjectProfileMapping])
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