import { Controller, Put, HttpCode, UseGuards, Req, Param, Post } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { Project } from './project.entity';
import { ProjectService } from "./project.service";
import { ProjectCouldNotBeUpdatedException } from '@api/features/project/project.exception';

@Controller('projects')
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) { }

    @Post('')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createProject(@Req() request: Request): Promise<Project> {
        return await this.projectService.createProject(request.body);
    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async updateProject(@Param('id') id: number, @Req() request: Request): Promise<Project> {
        const project = await this.projectService.updateProject(request.body);
        if(!project) throw new ProjectCouldNotBeUpdatedException();

        return project;
    }
}