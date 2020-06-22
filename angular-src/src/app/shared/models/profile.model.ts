import { Deserializable } from './deserializable.model';
import { Project } from './project.model';
import { Post } from './post.model';

export class Profile implements Deserializable {
    _id:            any;
    uri:            string;
    name:           string;
    landing:        any;
    about:          any;
    projects:       Array<Project>;
    posts:          Array<Post>;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}