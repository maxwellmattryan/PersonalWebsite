import { BlogPost } from '@app/shared/models/post.model';
import { Topic } from '@app/shared/models/topic.model';

export interface Blog {
    posts: Array<BlogPost>;
    topics: Array<Topic>;
}