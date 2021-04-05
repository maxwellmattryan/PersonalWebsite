import { Id } from '@api/core/database/entity.service';
import { BlogPost } from '../entities/blog-post.entity';
import { BlogPostService } from '../services/blog-post.service';
export declare class BlogPostController {
    private readonly blogPostService;
    constructor(blogPostService: BlogPostService);
    getPosts(topicId: Id, isPublished: string): Promise<BlogPost[]>;
    createPost(postData: BlogPost): Promise<BlogPost>;
    getPost(id: Id): Promise<BlogPost>;
    updatePost(id: Id, postData: BlogPost): Promise<BlogPost>;
    deletePost(id: Id): Promise<void>;
}
