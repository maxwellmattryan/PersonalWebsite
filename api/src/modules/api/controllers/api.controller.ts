import { Controller, Get, HttpCode } from '@nestjs/common';

import { BlogPost } from "@api/modules/blog/entities/blog-post.entity";
import { PortfolioProfile } from "@api/modules/portfolio/entities/portfolio-profile.entity";

import { BlogPostService } from '@api/modules/blog/services/blog-post.service';
import { PortfolioProfileService } from '@api/modules/portfolio/services/portfolio-profile.service';
import { PortfolioProjectService } from '@api/modules/portfolio/services/portfolio-project.service';

import { BlogPostsWereNotFoundException } from '@api/modules/blog/exceptions/blog-post.exception'
import { ActivePortfolioProfileWasNotFoundException } from '@api/modules/portfolio/exceptions/portfolio-profile.exception';
import { PortfolioProjectsWereNotFoundException } from '@api/modules/portfolio/exceptions/portfolio-project.exception';

@Controller()
export class ApiController {
    constructor(
        private readonly blogService: BlogPostService,
        private readonly profileService: PortfolioProfileService,
        private readonly projectService: PortfolioProjectService
    ) { }

    @Get('home')
    @HttpCode(200)
    async getHomepage(): Promise<{ profile: PortfolioProfile, posts: BlogPost[] }> {
        const profile = await this.profileService.getProfileByStatus('ACTIVE');
        if(!profile) throw new ActivePortfolioProfileWasNotFoundException();

        const projects = await this.projectService.getProjectsForProfile(profile.id);
        if(projects.length == 0) throw new PortfolioProjectsWereNotFoundException();
        profile.projects = projects;

        let posts = await this.blogService.getPostsByStatus('PUBLISHED')
        if(posts.length == 0) throw new BlogPostsWereNotFoundException();
        posts = posts.slice(0, 3);

        return { profile: profile, posts: posts };
    }
}
