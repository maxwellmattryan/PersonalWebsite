import { Deserializable } from './deserializable.model';
import { Post } from './post.model';

export class Topic implements Deserializable {
    _id:            any;
    uri:            string;
    name:           string;
    description:    string;
    imageURL:       string;
    posts:          Array<Post>;

    deserialize(input: any): this {
        Object.assign(this, input);

        this.posts = input.posts.map(p => new Post().deserialize(p));

        return this;
    }
}