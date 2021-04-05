import { Repository } from 'typeorm';
import { EntityService } from '@api/core/database/entity.service';
import { BlogAuthor } from '../entities/blog-author.entity';
export declare class BlogAuthorService extends EntityService<BlogAuthor> {
    private readonly blogAuthorRepository;
    constructor(blogAuthorRepository: Repository<BlogAuthor>);
    getAuthors(): Promise<BlogAuthor[]>;
}
