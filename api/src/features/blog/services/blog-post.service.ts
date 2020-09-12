import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/exceptions/http.exception';
import { BlogPostAlreadyExistsException } from '../exceptions/blog-post.exception';

import { BlogPost } from '../entities/blog-post.entity';

@Injectable()
export class BlogPostService {
    constructor(
        @InjectRepository(BlogPost)
        private readonly blogPostRepository: Repository<BlogPost>
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
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
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
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .leftJoinAndSelect('bp.topics', 'bt')
            .where('bp.id = :id', { id: id })
            .getOne();
    }

    public async getPosts(): Promise<BlogPost[]> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .orderBy('bp.updated_at', 'DESC')
            .getMany();
    }

    public async getPostsByStatus(status: string): Promise<BlogPost[]> {
        return (await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .orderBy('bp.updated_at', 'DESC')
            .getMany()).filter(p => p.status.status === status);
    }

    public async getPostsByStatusAndTopic(status: string, topicId: number): Promise<BlogPost[]> {
        return (await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .where('bt.id = :id', { id: topicId })
            .orderBy('bp.updated_at', 'DESC')
            .getMany()).filter(p => p.status.status === status);
    }

    public async getPostsByTopic(topicId: number): Promise<BlogPost[]> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .where('bt.id = :id', { id: topicId })
            .orderBy('bt.updated_at', 'DESC')
            .getMany();
    }

    public async updatePost(id: number, postData: BlogPost): Promise<BlogPost> {
        await this.blogPostRepository.save(postData);

        return this.getPost(id);
    }
}