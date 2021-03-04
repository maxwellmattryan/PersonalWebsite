import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService, Id } from '@api/core/database/entity.service';
import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';

import { BlogTopic } from '../entities/blog-topic.entity';

import { BlogTopicAlreadyExistsException } from '../exceptions/blog-topic.exception';

@Injectable()
export class BlogTopicService extends EntityService<BlogTopic> {
  constructor(
    @InjectRepository(BlogTopic)
    private readonly blogTopicRepository: Repository<BlogTopic>,
  ) {
    super();
  }

  public async existsInTable(id: Id): Promise<boolean> {
    return (
      (await this.blogTopicRepository
        .createQueryBuilder('bt')
        .where('bt.id = :id', { id: id })
        .getCount()) > 0
    );
  }

  public async createTopic(topicData: BlogTopic): Promise<BlogTopic> {
    const topic: BlogTopic = this.blogTopicRepository.create(topicData);
    topic.id = this.createStringHashId(topic.name);

    return await this.blogTopicRepository.save(topic).catch((error) => {
      if (error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
        throw new BlogTopicAlreadyExistsException();
      } else {
        throw new InternalServerErrorException();
      }
    });
  }

  public async deleteTopic(id: Id): Promise<void> {
    await this.blogTopicRepository
      .createQueryBuilder()
      .delete()
      .from(BlogTopic)
      .where('blog_topic.id = :id', { id: id })
      .execute();
  }

  public async getTopic(id: Id): Promise<BlogTopic> {
    return await this.blogTopicRepository
      .createQueryBuilder('bt')
      .where('bt.id = :id', { id: id })
      .getOne();
  }

  public async getTopics(): Promise<BlogTopic[]> {
    return await this.blogTopicRepository
      .createQueryBuilder('bt')
      .orderBy('bt.name', 'ASC')
      .getMany();
  }

  public async updateTopic(id: Id, data: BlogTopic): Promise<BlogTopic> {
    await this.blogTopicRepository.update(id, data);

    return await this.getTopic(id);
  }
}
