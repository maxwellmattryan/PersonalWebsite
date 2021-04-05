import { Repository } from 'typeorm';
import { EntityService, Id } from '@api/core/database/entity.service';
import { BlogTopic } from '../entities/blog-topic.entity';
export declare class BlogTopicService extends EntityService<BlogTopic> {
    private readonly blogTopicRepository;
    constructor(blogTopicRepository: Repository<BlogTopic>);
    existsInTable(id: Id): Promise<boolean>;
    createTopic(topicData: BlogTopic): Promise<BlogTopic>;
    deleteTopic(id: Id): Promise<void>;
    getTopic(id: Id): Promise<BlogTopic>;
    getTopics(): Promise<BlogTopic[]>;
    updateTopic(id: Id, topicData: BlogTopic): Promise<BlogTopic>;
}
