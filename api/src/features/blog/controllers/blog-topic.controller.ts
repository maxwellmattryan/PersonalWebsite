import { Controller, Post, HttpCode, UseGuards, Req, Put, Param, Delete, Get } from '@nestjs/common';

import { Request } from 'express'

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { BlogTopic } from '../entities/blog-topic.entity';
import { BlogTopicService } from '../services/blog-topic.service';
import { BlogTopicCouldNotBeUpdated, BlogTopicWasNotFoundException } from '../exceptions/blog-topic.exception';

@Controller('blog/topics')
export class BlogTopicController {
    constructor(
        private readonly blogTopicService: BlogTopicService
    ) { }

    @Post('')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createTopic(@Req() request: Request): Promise<BlogTopic> {
        return await this.blogTopicService.createTopic(request.body);
    }

    @Get(':id')
    @HttpCode(200)
    async getTopic(@Param('id') id: number, @Req() request: Request): Promise<BlogTopic> {
        const topic = await this.blogTopicService.getTopic(id);
        if(!topic) throw new BlogTopicWasNotFoundException();

        return topic;
    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async updateTopic(@Param('id') id: number, @Req() request: Request): Promise<BlogTopic> {
        const topic = await this.blogTopicService.updateTopic(id, request.body);
        if(!topic) throw new BlogTopicCouldNotBeUpdated();

        return topic;
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    async deleteTopic(@Param('id') id: number, @Req() request: Request): Promise<void> {
        if(!(await this.blogTopicService.existsInTable(id))) throw new BlogTopicWasNotFoundException();

        await this.blogTopicService.deleteTopic(id);
    }
}