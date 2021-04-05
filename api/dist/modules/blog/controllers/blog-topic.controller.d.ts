import { Id } from '@api/core/database/entity.service';
import { BlogTopic } from '../entities/blog-topic.entity';
import { BlogTopicService } from '../services/blog-topic.service';
export declare class BlogTopicController {
    private readonly blogTopicService;
    constructor(blogTopicService: BlogTopicService);
    getTopics(): Promise<BlogTopic[]>;
    createTopic(topicData: BlogTopic): Promise<BlogTopic>;
    getTopic(id: Id): Promise<BlogTopic>;
    updateTopic(id: Id, topicData: BlogTopic): Promise<BlogTopic>;
    deleteTopic(id: Id): Promise<void>;
}
