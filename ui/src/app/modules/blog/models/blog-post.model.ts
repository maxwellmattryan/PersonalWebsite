import { Id } from '@ui/core/models/model';
import { Deserializable } from '@ui/core/models/deserializable.model';

import { BlogAuthor } from './blog-author.model';
import { BlogPostStatus } from './blog-post-status.model';
import { BlogTopic } from './blog-topic.model';

export class BlogPost implements Deserializable {
    constructor(partial: Partial<BlogPost>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        this.author = input.author.map(ba => new BlogAuthor({ ...ba }).deserialize(ba));
        this.status = input.status.map(bps => new BlogPostStatus({ ...bps }).deserialize(bps));

        this.topics = input.topics.map(bt => new BlogTopic({ ...bt }).deserialize(bt));

        return this;
    }

    id?: Id;

    author: BlogAuthor;
    status: BlogPostStatus;

    topics?: BlogTopic[];

    title: string;
    subtitle: string;
    preview: string;
    content: string;
    image_url: string;

    created_at:      Date;
    updated_at:      Date;
}
