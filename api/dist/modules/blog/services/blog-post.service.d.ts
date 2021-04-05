import { Repository } from 'typeorm';
import { EntityService, Id } from '@api/core/database/entity.service';
import { BlogPost } from '../entities/blog-post.entity';
export declare class BlogPostService extends EntityService<BlogPost> {
    private readonly blogPostRepository;
    constructor(blogPostRepository: Repository<BlogPost>);
    existsInTable(id: Id): Promise<boolean>;
    createPost(postData: BlogPost): Promise<BlogPost>;
    deletePost(id: Id): Promise<void>;
    getPost(id: Id): Promise<BlogPost>;
    getPosts(): Promise<BlogPost[]>;
    getPostsByStatus(status: string): Promise<BlogPost[]>;
    getPostsByStatusAndTopic(status: string, topicId: Id): Promise<BlogPost[]>;
    getPostsByTopic(topicId: Id): Promise<BlogPost[]>;
    updatePost(id: Id, postData: BlogPost): Promise<BlogPost>;
}
