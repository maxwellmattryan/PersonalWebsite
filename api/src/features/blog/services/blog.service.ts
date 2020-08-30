import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BlogPost } from '../entities/blog-post.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogPost)
        private readonly blogPostRepository: Repository<BlogPost>
    ) { }

    public async getPostsByStatus(status: string): Promise<BlogPost[]> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.status', 'bps')
            .where('bps.status = :status', { status: status })
            .getMany()
    }
}