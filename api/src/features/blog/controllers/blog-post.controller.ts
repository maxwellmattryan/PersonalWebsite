import { Controller, Get, HttpCode, Param, Req, Query } from '@nestjs/common';

import { Request } from 'express';

import { BlogPost } from '../entities/blog-post.entity';

import { BlogService } from '../services/blog.service';

import { NoBlogPostsWereFoundException } from '../exceptions/blog-post.exception';

@Controller('blog/posts')
export class BlogPostController {
    constructor(
        private readonly blogService: BlogService
    ) { }

    @Get('')
    @HttpCode(200)
    async getPublishedPosts(
        @Query('topic_id') topicId: string,
        @Req() request: Request
    ): Promise<BlogPost[]> {
        let posts: BlogPost[];
        if(topicId) {
            posts = await this.blogService.getPostsByStatusAndTopic('PUBLISHED', parseInt(topicId));
        } else {
            posts = await this.blogService.getPostsByStatus('PUBLISHED');
        }
        if(posts.length == 0) throw new NoBlogPostsWereFoundException();

        console.log(posts);

        return posts;
    }
}