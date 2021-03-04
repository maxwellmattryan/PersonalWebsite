import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService } from '@api/core/database/entity.service';

import { BlogPostStatus } from '../entities/blog-post-status.entity';

@Injectable()
export class BlogPostStatusService extends EntityService<BlogPostStatus> {
    constructor(
        @InjectRepository(BlogPostStatus)
        private readonly blogPostStatusRepository: Repository<BlogPostStatus>
    ) { super(); }

    public async getStatuses(): Promise<BlogPostStatus[]> {
        return this.blogPostStatusRepository
            .createQueryBuilder('bps')
            .getMany();
    }
}
