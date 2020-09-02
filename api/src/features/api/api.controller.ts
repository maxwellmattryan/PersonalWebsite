import { Controller, Get, HttpCode, Param, Query, Req } from '@nestjs/common';

import { Request } from 'express';

import { BlogPostService } from '@api/features/blog/services/blog-post.service';
import { ProfileService } from '@api/features/profile/profile.service';
import { ProjectService } from '@api/features/project/project.service';

import { ActiveProfileWasNotFoundException } from '@api/features/profile/profile.exception';
import { BlogPostsWereNotFoundException } from '@api/features/blog/exceptions/blog-post.exception'
import { ProjectsWereNotFoundException } from '../project/project.exception';

@Controller()
export class ApiController {
    constructor(
        private readonly blogService: BlogPostService,
        private readonly profileService: ProfileService,
        private readonly projectService: ProjectService
    ) { }

    @Get('homepage')
    @HttpCode(200)
    async getHomepage(@Query('published') publishedPostsOnly: string, @Req() request: Request): Promise<any> {
        const profile = await this.profileService.getProfileByStatus('ACTIVE');
        if(!profile) throw new ActiveProfileWasNotFoundException();

        const projects = await this.projectService.getProjectsForProfile(profile.id);
        if(projects.length == 0) throw new ProjectsWereNotFoundException();
        profile.projects = projects;

        const posts = await this.blogService.getPostsByStatus('PUBLISHED')
        if(posts.length == 0) throw new BlogPostsWereNotFoundException();

        return { profile: profile, posts: posts };
    }
}