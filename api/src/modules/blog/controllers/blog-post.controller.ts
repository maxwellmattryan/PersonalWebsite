import {
    Controller,
    Get,
    HttpCode,
    Param,
    Query,
    Put,
    UseGuards,
    Post,
    Delete,
    Body, HttpStatus
} from '@nestjs/common';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';
import { Id } from '@api/core/database/entity.service';

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

    @Get()
    @HttpCode(HttpStatus.OK)
    async getPosts(
        @Query('topicId') topicId: Id,
        @Query('isPublished') isPublished: string
    ): Promise<BlogPost[]> {
        let posts: BlogPost[];

        if(isPublished === 'true') {
            if(topicId)
                posts = await this.blogPostService.getPostsByStatusAndTopic('PUBLISHED', topicId);
            else
                posts = await this.blogPostService.getPostsByStatus('PUBLISHED');
        } else {
            if(topicId)
                posts = await this.blogPostService.getPostsByTopic(topicId);
            else
                posts = await this.blogPostService.getPosts();
        }

        if(posts.length == 0) throw new BlogPostsWereNotFoundException();

        return posts;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    async createPost(
        @Body() postData: BlogPost
    ): Promise<BlogPost> {
        return this.blogPostService.createPost(postData);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getPost(
        @Param('id') id: Id
    ): Promise<BlogPost> {
        const post = await this.blogPostService.getPost(id);
        if(!post) throw new BlogPostWasNotFoundException();

        return post;
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async updatePost(
        @Param('id') id: Id,
        @Body() postData: BlogPost
    ): Promise<BlogPost> {
        const post = await this.blogPostService.updatePost(id, postData);
        if(!post) throw new BlogPostCouldNotBeUpdated();

        return post;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard)
    async deletePost(
        @Param('id') id: Id
    ): Promise<void> {
        if(!(await this.blogPostService.existsInTable(id)))
            throw new BlogPostWasNotFoundException();

        await this.blogPostService.deletePost(id);
    }
}
