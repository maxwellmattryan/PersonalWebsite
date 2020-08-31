import { Controller, Get, HttpCode, Param, Req, Query, Put, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { BlogPost } from '../entities/blog-post.entity';
import { BlogPostService } from '../services/blog-post.service';
import {
    BlogPostCouldNotBeUpdated,
    BlogPostsWereNotFoundException,
    BlogPostWasNotFoundException
} from '../exceptions/blog-post.exception';

@Controller('blog/posts')
export class BlogPostController {
    constructor(
        private readonly blogPostService: BlogPostService
    ) { }

    @Get('')
    @HttpCode(200)
    async getPublishedPosts(
        @Query('topic_id') topicId: string,
        @Req() request: Request
    ): Promise<BlogPost[]> {
        let posts: BlogPost[];
        if(topicId) {
            posts = await this.blogPostService.getPostsByStatusAndTopic('PUBLISHED', parseInt(topicId));
        } else {
            posts = await this.blogPostService.getPostsByStatus('PUBLISHED');
        }
        if(posts.length == 0) throw new BlogPostsWereNotFoundException();

        return posts;
    }

    @Get(':id')
    @HttpCode(200)
    async getPost(@Param('id') id: number, @Req() request: Request): Promise<BlogPost> {
        const post = await this.blogPostService.getPost(id);
        if(!post) throw new BlogPostWasNotFoundException();

        return post;
    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async updatePost(@Param('id') id: number, @Req() request: Request): Promise<BlogPost> {
        const post = await this.blogPostService.updatePost(id, request.body);
        if(!post) throw new BlogPostCouldNotBeUpdated();

        return post;
    }
}