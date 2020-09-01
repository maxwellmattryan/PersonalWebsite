import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCode } from '@api/core/database/postgres-error-code.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';
import { BlogPostAlreadyExistsException } from '../exceptions/blog-post.exception';

import { BlogPost } from '../entities/blog-post.entity';
import { BlogPostStatus } from '../entities/blog-post-status.entity';

@Injectable()
export class BlogPostService {
    constructor(
        @InjectRepository(BlogPost)
        private readonly blogPostRepository: Repository<BlogPost>,
        @InjectRepository(BlogPostStatus)
        private readonly blogPostStatusRepository: Repository<BlogPostStatus>
    ) { }

    public async existsInTable(id: number): Promise<boolean> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .where('bp.id = :id', { id: id })
            .getCount() > 0;
    }

    public async createPost(postData: BlogPost): Promise<BlogPost> {
        const post: BlogPost = this.blogPostRepository.create(postData);

        return await this.blogPostRepository.save(post)
            .catch((error) => {
                console.log(error);
                if(error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
                    throw new BlogPostAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            })
    }

    public async deletePost(id: number): Promise<void> {
        await this.blogPostRepository
            .createQueryBuilder()
            .delete()
            .from(BlogPost)
            .where('blog_post.id = :id', { id: id })
            .execute();
    }

    public async getPost(id: number): Promise<BlogPost> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.status', 'bps')
            .leftJoinAndSelect('bp.topics', 'bt')
            .where('bp.id = :id', { id: id })
            .getOne();
    }

    public async getPosts(): Promise<BlogPost[]> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .orderBy('bp.created_at', 'DESC')
            .getMany();
    }

    public async getPostsByStatus(status: string): Promise<BlogPost[]> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .where('bps.status = :status', { status: status })
            .orderBy('bp.created_at', 'DESC')
            .getMany();
    }

    public async getPostsByStatusAndTopic(status: string, topicId: number): Promise<BlogPost[]> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .where('bps.status = :status', { status: status })
            .where('bt.id = :id', { id: topicId })
            .orderBy('bp.created_at', 'DESC')
            .getMany();
    }

    public async getPostsByTopic(topicId: number): Promise<BlogPost[]> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .where('bt.id = :id', { id: topicId })
            .orderBy('bt.created_at', 'DESC')
            .getMany();
    }

    public async getStatuses(): Promise<BlogPostStatus[]> {
        return await this.blogPostStatusRepository
            .createQueryBuilder('bps')
            .getMany();
    }

    public async updatePost(id: number, postData: BlogPost): Promise<BlogPost> {
        await this.blogPostRepository.save(postData);

        return this.getPost(id);
    }
}