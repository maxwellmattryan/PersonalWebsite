import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';

import { ProfileService } from '@api/features/profile/profile.service';
import { ProjectService } from '@api/features/project/project.service';

import { Profile } from '@api/features/profile/profile.entity';

import { NoActiveProfileWasFoundException } from '@api/features/profile/profile.exception';
import { NoProjectsWereFoundException } from '../project/project.exception';

@Controller()
export class ApiController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly projectService: ProjectService
    ) { }

    @Get('homepage')
    @HttpCode(200)
    async getHomepage(): Promise<any> {
        const profile = await this.profileService.getActiveProfile();
        if(!profile) throw new NoActiveProfileWasFoundException();

        const projects = await this.projectService.getProjectsForProfile(profile.id);
        if(projects.length == 0) throw new NoProjectsWereFoundException();

        return { profile: profile, projects: projects };
    }
}