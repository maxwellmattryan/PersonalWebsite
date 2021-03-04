import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';
import { BlogPostAlreadyExistsException } from '../exceptions/blog-post.exception';

import { BlogPost } from '../entities/blog-post.entity';
import { EntityService, Id } from "@api/core/database/entity.service";

@Injectable()
export class BlogPostService extends EntityService<BlogPost> {
    constructor(
        @InjectRepository(BlogPost)
        private readonly blogPostRepository: Repository<BlogPost>
    ) { super(); }

    public async existsInTable(id: Id): Promise<boolean> {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .where('bp.id = :id', { id: id })
            .getCount() > 0;
    }

    public async createPost(postData: BlogPost): Promise<BlogPost> {
        const post: BlogPost = this.createEntity(
            this.blogPostRepository.create(postData),
            'title'
        );

        return this.blogPostRepository.save(post)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
                    throw new BlogPostAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            })
    }

    public async deletePost(id: Id): Promise<void> {
        await this.blogPostRepository
            .createQueryBuilder()
            .delete()
            .from(BlogPost)
            .where('blog_post.id = :id', { id: id })
            .execute();
    }

    public async getPost(id: Id): Promise<BlogPost> {
        return this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .leftJoinAndSelect('bp.topics', 'bt')
            .where('bp.id = :id', { id: id })
            .getOne();
    }

    public async getPosts(): Promise<BlogPost[]> {
        return this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .orderBy('bp.updated_at', 'DESC')
            .getMany();
    }

    public async getPostsByStatus(status: string): Promise<BlogPost[]> {
        return this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .where('bps.status = :status', { status: status })
            .orderBy('bp.updated_at', 'DESC')
            .getMany();
    }

    public async getPostsByStatusAndTopic(status: string, topicId: Id): Promise<BlogPost[]> {
        return this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .where('bt.id = :id', { id: topicId })
            .andWhere('bps.status = :status', { status: status })
            .orderBy('bp.updated_at', 'DESC')
            .getMany();
    }

    public async getPostsByTopic(topicId: Id): Promise<BlogPost[]> {
        return this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .where('bt.id = :id', { id: topicId })
            .orderBy('bt.updated_at', 'DESC')
            .getMany();
    }

    public async updatePost(id: Id, postData: BlogPost): Promise<BlogPost> {
        await this.blogPostRepository.save(postData);

        return this.getPost(id);
    }
}
