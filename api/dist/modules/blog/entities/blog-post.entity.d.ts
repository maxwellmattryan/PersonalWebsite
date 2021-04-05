import { Id } from '@api/core/database/entity.service';
import { BlogAuthor } from './blog-author.entity';
import { BlogPostStatus } from './blog-post-status.entity';
import { BlogTopic } from './blog-topic.entity';
export declare class BlogPost {
    constructor(partial: Partial<BlogPost>);
    id?: Id;
    author: BlogAuthor;
    status: BlogPostStatus;
    topics: BlogTopic[];
    title: string;
    subtitle: string;
    preview: string;
    content: string;
    image_url: string;
    created_at?: Date;
    updated_at?: Date;
}
