import { Controller, Get, HttpCode, Param, Query, Req } from '@nestjs/common';

import { Request } from 'express';

import { BlogService } from '@api/features/blog/services/blog.service';
import { ProfileService } from '@api/features/profile/profile.service';
import { ProjectService } from '@api/features/project/project.service';

import { NoActiveProfileWasFoundException } from '@api/features/profile/profile.exception';
import { NoBlogPostsWereFoundException } from '@api/features/blog/exceptions/blog-post.exception'
import { NoProjectsWereFoundException } from '../project/project.exception';

@Controller()
export class ApiController {
    constructor(
        private readonly blogService: BlogService,
        private readonly profileService: ProfileService,
        private readonly projectService: ProjectService
    ) { }

    @Get('homepage')
    @HttpCode(200)
    async getHomepage(@Query('published') publishedPostsOnly: string, @Req() request: Request): Promise<any> {
        const profile = await this.profileService.getActiveProfile();
        if(!profile) throw new NoActiveProfileWasFoundException();

        const projects = await this.projectService.getProjectsForProfile(profile.id);
        if(projects.length == 0) throw new NoProjectsWereFoundException();

        // const posts = await this.blogService.getPostsByStatus('PUBLISHED')
        const posts = await this.blogService.getPosts();
        if(posts.length == 0) throw new NoBlogPostsWereFoundException();

        return { profile: profile, projects: projects, posts: posts };
    }
}