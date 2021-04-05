import { Id } from '@api/core/database/entity.service';
export declare class BlogAuthor {
    constructor(partial: Partial<BlogAuthor>);
    id?: Id;
    first_name: string;
    last_name: string;
}
