import { Controller, Put, HttpCode, UseGuards, Req, Param, Post, Get, Delete } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { ProfileService } from '@api/features/profile/profile.service';

import { Project } from './project.entity'
import { ProjectService } from "./project.service";
import { ProjectWasNotFoundException, ProjectCouldNotBeUpdatedException } from './project.exception';

@Controller('projects')
export class ProjectController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly projectService: ProjectService
    ) { }

    @Post('')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createProject(@Req() request: Request): Promise<Project> {
        return await this.projectService.createProject(request.body);
    }

    @Get(':id')
    @HttpCode(200)
    async getProject(@Param('id') id: number, @Req() request: Request): Promise<Project> {
        const project = await this.projectService.getProject(id);
        if(!project) throw new ProjectWasNotFoundException();

        return project;
    }


    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async updateProject(@Param('id') id: number, @Req() request: Request): Promise<Project> {
        const project = await this.projectService.updateProject(id, request.body);
        if(!project) throw new ProjectCouldNotBeUpdatedException();

        return project;
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    async deleteProject(@Param('id') id: number, @Req() request: Request): Promise<void> {
        if(!(await this.projectService.existsInTable(id))) throw new ProjectWasNotFoundException();

        await this.projectService.deleteProject(id);
    }
}