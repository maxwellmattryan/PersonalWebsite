import { Repository } from 'typeorm';
import { EntityService } from '@api/core/database/entity.service';
import { BlogPostStatus } from '../entities/blog-post-status.entity';
export declare class BlogPostStatusService extends EntityService<BlogPostStatus> {
    private readonly blogPostStatusRepository;
    constructor(blogPostStatusRepository: Repository<BlogPostStatus>);
    getStatuses(): Promise<BlogPostStatus[]>;
}
