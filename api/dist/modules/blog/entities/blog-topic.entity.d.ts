import { Id } from '@api/core/database/entity.service';
import { BlogPost } from '@api/modules/blog/entities/blog-post.entity';
export declare class BlogTopic {
    constructor(partial: Partial<BlogTopic>);
    id?: Id;
    posts: BlogPost[];
    name: string;
    description: string;
    created_at?: Date;
    updated_at?: Date;
}
