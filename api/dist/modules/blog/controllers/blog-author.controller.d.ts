import { BlogAuthor } from '../entities/blog-author.entity';
import { BlogAuthorService } from '../services/blog-author.service';
export declare class BlogAuthorController {
    private readonly blogAuthorService;
    constructor(blogAuthorService: BlogAuthorService);
    getAuthors(): Promise<BlogAuthor[]>;
}
