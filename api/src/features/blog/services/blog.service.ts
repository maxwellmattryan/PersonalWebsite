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

    public async getPosts(): Promise<BlogPost[]> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.status', 'bps')
            .leftJoinAndSelect('bp.topics', 'bt')
            .orderBy('bp.created_at', 'DESC')
            .getMany()
    }

    public async getPostsByStatus(status: string): Promise<BlogPost[]> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.status', 'bps')
            .leftJoinAndSelect('bp.topics', 'bt')
            .where('bps.status = :status', { status: status })
            .orderBy('bp.created_at', 'DESC')
            .getMany()
    }

    public async getPostsByStatusAndTopic(status: string, topicId: number): Promise<BlogPost[]> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.status', 'bps')
            .leftJoinAndSelect('bp.topics', 'bt')
            .where('bps.status = :status', { status: status })
            .where('bt.id = :id', { id: topicId })
            .orderBy('bp.created_at', 'DESC')
            .getMany()
    }
}