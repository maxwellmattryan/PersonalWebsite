import { Controller, Put, HttpCode, UseGuards, Req, Param, Post, Get, Delete } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { PortfolioProfileService } from '../services/portfolio-profile.service';

import { PortfolioProject } from '../entities/portfolio-project.entity'
import { PortfolioProjectService } from '../services/portfolio-project.service';
import {
    PortfolioProjectWasNotFoundException,
    PortfolioProjectCouldNotBeUpdatedException,
    PortfolioProjectsWereNotFoundException
} from '../exceptions/portfolio-project.exception';

@Controller('portfolio/projects')
export class PortfolioProjectController {
    constructor(
        private readonly profileService: PortfolioProfileService,
        private readonly projectService: PortfolioProjectService
    ) { }

    @Get('')
    @HttpCode(200)
    async getProjects(@Req() request: Request): Promise<PortfolioProject[]> {
        const projects = await this.projectService.getProjects();
        if(projects.length === 0) throw new PortfolioProjectsWereNotFoundException();

        return projects;
    }

    @Post('')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createProject(@Req() request: Request): Promise<PortfolioProject> {
        return await this.projectService.createProject(request.body);
    }

    @Get(':id')
    @HttpCode(200)
    async getProject(@Param('id') id: number, @Req() request: Request): Promise<PortfolioProject> {
        const project = await this.projectService.getProject(id);
        if(!project) throw new PortfolioProjectWasNotFoundException();

        return project;
    }


    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async updateProject(@Param('id') id: number, @Req() request: Request): Promise<PortfolioProject> {
        const project = await this.projectService.updateProject(id, request.body);
        if(!project) throw new PortfolioProjectCouldNotBeUpdatedException();

        return project;
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    async deleteProject(@Param('id') id: number, @Req() request: Request): Promise<void> {
        if(!(await this.projectService.existsInTable(id))) throw new PortfolioProjectWasNotFoundException();

        await this.projectService.deleteProject(id);
    }
}