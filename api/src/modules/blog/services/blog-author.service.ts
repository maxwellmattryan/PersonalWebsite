import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService } from "@api/core/database/entity.service";

import { BlogAuthor } from '../entities/blog-author.entity';

@Injectable()
export class BlogAuthorService extends EntityService<BlogAuthor> {
    constructor(
        @InjectRepository(BlogAuthor)
        private readonly blogAuthorRepository: Repository<BlogAuthor>
    ) { super(); }

    public async getAuthors(): Promise<BlogAuthor[]> {
        return this.blogAuthorRepository
            .createQueryBuilder('ba')
            .getMany();
    }
}
