import { BlogPostStatus } from '../entities/blog-post-status.entity';
import { BlogPostStatusService } from '../services/blog-post-status.service';
export declare class BlogPostStatusController {
    private readonly blogPostStatusService;
    constructor(blogPostStatusService: BlogPostStatusService);
    getPostStatuses(): Promise<BlogPostStatus[]>;
}
