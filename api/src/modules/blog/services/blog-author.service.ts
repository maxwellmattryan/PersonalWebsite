import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BlogAuthor } from '../entities/blog-author.entity';

@Injectable()
export class BlogAuthorService {
    constructor(
        @InjectRepository(BlogAuthor)
        private readonly blogAuthorRepository: Repository<BlogAuthor>
    ) { }

    public async getAuthors(): Promise<BlogAuthor[]> {
        return await this.blogAuthorRepository
            .createQueryBuilder('ba')
            .getMany();
    }
}