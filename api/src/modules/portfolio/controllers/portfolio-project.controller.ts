import { Controller, Put, HttpCode, UseGuards, Param, Post, Get, Delete, Body, HttpStatus } from '@nestjs/common';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';
import { Id } from '@api/core/database/entity.service';

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

    @Get()
    @HttpCode(HttpStatus.OK)
    async getProjects(): Promise<PortfolioProject[]> {
        const projects = await this.projectService.getProjects();
        if(projects.length === 0) throw new PortfolioProjectsWereNotFoundException();

        return projects;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    async createProject(
        @Body() projectData: PortfolioProject
    ): Promise<PortfolioProject> {
        return this.projectService.createProject(projectData);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getProject(
        @Param('id') id: Id,
    ): Promise<PortfolioProject> {
        const project = await this.projectService.getProject(id);
        if(!project) throw new PortfolioProjectWasNotFoundException();

        return project;
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async updateProject(
        @Param('id') id: Id,
        @Body() projectData: PortfolioProject
    ): Promise<PortfolioProject> {
        const project = await this.projectService.updateProject(id, projectData);
        if(!project) throw new PortfolioProjectCouldNotBeUpdatedException();

        return project;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard)
    async deleteProject(
        @Param('id') id: Id
    ): Promise<void> {
        if(!(await this.projectService.existsInTable(id)))
            throw new PortfolioProjectWasNotFoundException();

        await this.projectService.deleteProject(id);
    }
}
