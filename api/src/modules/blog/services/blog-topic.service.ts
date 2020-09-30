import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/exceptions/http.exception';
import { BlogTopicAlreadyExistsException } from '../exceptions/blog-topic.exception';

import { BlogTopic } from '../entities/blog-topic.entity';

@Injectable()
export class BlogTopicService {
    constructor(
        @InjectRepository(BlogTopic)
        private readonly blogTopicRepository: Repository<BlogTopic>
    ) { }

    public async existsInTable(id: number): Promise<boolean> {
        return await this.blogTopicRepository
            .createQueryBuilder('bt')
            .where('bt.id = :id', { id: id })
            .getCount() > 0;
    }

    public async createTopic(topicData: BlogTopic): Promise<BlogTopic> {
        const topic: BlogTopic = this.blogTopicRepository.create(topicData);

        return await this.blogTopicRepository.save(topic)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
                    throw new BlogTopicAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            })
    }

    public async deleteTopic(id: number): Promise<void> {
        await this.blogTopicRepository
            .createQueryBuilder()
            .delete()
            .from(BlogTopic)
            .where('blog_topic.id = :id', { id: id })
            .execute();
    }

    public async getTopic(id: number): Promise<BlogTopic> {
        return await this.blogTopicRepository
            .createQueryBuilder('bt')
            .where('bt.id = :id', { id: id })
            .getOne();
    }

    public async getTopics(): Promise<BlogTopic[]> {
        return await this.blogTopicRepository
            .createQueryBuilder('bt')
            .getMany();
    }

    public async updateTopic(id: number, data: BlogTopic): Promise<BlogTopic> {
        await this.blogTopicRepository.update(id, data);

        return await this.getTopic(id);
    }
}