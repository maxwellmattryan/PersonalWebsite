import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BlogPostStatus } from '../entities/blog-post-status.entity';

@Injectable()
export class BlogPostStatusService {
    constructor(
        @InjectRepository(BlogPostStatus)
        private readonly blogPostStatusRepository: Repository<BlogPostStatus>
    ) { }

    public async getStatuses(): Promise<BlogPostStatus[]> {
        return await this.blogPostStatusRepository
            .createQueryBuilder('bps')
            .getMany();
    }
}