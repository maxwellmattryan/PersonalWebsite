import { Controller, Get, HttpCode, Param, Req, Query, Put, UseGuards, Post, Delete } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';
import { Id } from "@api/core/database/entity.service";

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
    async getPosts(
        @Query('topicId') topicId: Id,
        @Query('published') published: string
    ): Promise<BlogPost[]> {
        let posts: BlogPost[];

        if(published === 'true') {
            if(topicId)
                posts = await this.blogPostService.getPostsByStatusAndTopic('PUBLISHED', parseInt(<string>topicId));
            else
                posts = await this.blogPostService.getPostsByStatus('PUBLISHED');
        } else {
            if(topicId)
                posts = await this.blogPostService.getPostsByTopic(parseInt(<string>topicId));
            else
                posts = await this.blogPostService.getPosts();
        }

        if(posts.length == 0) throw new BlogPostsWereNotFoundException();

        return posts;
    }

    @Post('')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createPost(
        @Req() request: Request
    ): Promise<BlogPost> {
        return await this.blogPostService.createPost(request.body);
    }

    @Get(':id')
    @HttpCode(200)
    async getPost(
        @Param('id') id: Id
    ): Promise<BlogPost> {
        const post = await this.blogPostService.getPost(id);
        if(!post) throw new BlogPostWasNotFoundException();

        return post;
    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async updatePost(
        @Param('id') id: Id,
        @Req() request: Request
    ): Promise<BlogPost> {
        const post = await this.blogPostService.updatePost(id, request.body);
        if(!post) throw new BlogPostCouldNotBeUpdated();

        return post;
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    async deletePost(
        @Param('id') id: Id
    ): Promise<void> {
        if(!(await this.blogPostService.existsInTable(id)))
            throw new BlogPostWasNotFoundException();

        await this.blogPostService.deletePost(id);
    }
}
