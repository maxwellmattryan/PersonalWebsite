import { Controller, Put, HttpCode, UseGuards, Req, Param, Post, Get, Delete } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { Profile } from '@api/features/profile/profile.entity';
import { ProfileService } from '@api/features/profile/profile.service';
import { NoProfilesWereFoundException } from '@api/features/profile/profile.exception';

import { Project } from './project.entity'
import { ProjectService } from "./project.service";
import { NoProjectWasFoundException, ProjectCouldNotBeUpdatedException } from './project.exception';

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
        return await this.projectService.createProject(request.body.project, request.body.profile_ids);
    }

    @Get(':id')
    @HttpCode(200)
    async getProject(@Param('id') id: number, @Req() request: Request): Promise<Project> {
        const project = await this.projectService.getProject(id);
        if(!project) throw new NoProjectWasFoundException();

        return project;
    }


    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async updateProject(@Param('id') id: number, @Req() request: Request): Promise<Project> {
        const project = await this.projectService.updateProject(request.body.project, request.body.profile_ids);
        if(!project) throw new ProjectCouldNotBeUpdatedException();

        return project;
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    async deleteProject(@Param('id') id: number, @Req() request: Request): Promise<void> {
        if(!(await this.projectService.existsInTable(id))) throw new NoProjectWasFoundException();

        await this.projectService.deleteProject(id);
    }

    @Get(':id/profiles')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getProjectForEditor(@Param('id') id: number, @Req() request: Request): Promise<Profile[]> {
        const profiles = await this.profileService.getProfilesForProject(id);
        if(profiles.length === 0) throw new NoProfilesWereFoundException();

        return profiles;
    }
}