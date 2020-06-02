import { Deserializable } from './deserializable.model';
import { Post } from './post.model';

export class Project implements Deserializable {
    _id:            any;
    uri:            string;
    title:          string;
    subtitle:       string;
    description:    string;
    imageURL:       string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}