import { Deserializable } from './deserializable.model';
import { Post } from './post.model';

export class Topic implements Deserializable {
    _id:            any;
    uri:            string;
    name:           string;
    description:    string;
    imageURL:       string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}