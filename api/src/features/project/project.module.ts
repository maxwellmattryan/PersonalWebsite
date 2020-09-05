import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileModule } from '@api/features/profile/profile.module';

import { ProjectController } from './controllers/project.controller';

import { Project } from './entities/project.entity';

import { ProjectService } from './services/project.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]),
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