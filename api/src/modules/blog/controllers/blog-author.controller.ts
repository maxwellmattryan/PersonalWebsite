import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { BlogAuthor } from '../entities/blog-author.entity';
import { BlogAuthorService } from '../services/blog-author.service';
import { BlogAuthorsWereNotFoundException } from '../exceptions/blog-author.exception';

@Controller('blog/authors')
export class BlogAuthorController {
    constructor(
        private readonly blogAuthorService: BlogAuthorService
    ) { }

    @Get('')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getAuthors(@Req() request: Request): Promise<BlogAuthor[]> {
        const authors = await this.blogAuthorService.getAuthors();
        if(authors.length === 0) throw new BlogAuthorsWereNotFoundException();

        return authors;
    }
}