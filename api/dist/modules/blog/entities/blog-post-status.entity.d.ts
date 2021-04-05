import { Id } from '@api/core/database/entity.service';
import { BlogPost } from '../entities/blog-post.entity';
export declare class BlogPostStatus {
    constructor(partial: Partial<BlogPostStatus>);
    id?: Id;
    status: string;
    post: BlogPost;
}
