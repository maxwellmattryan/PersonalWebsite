import { Deserializable } from './deserializable.model';
import { Project } from './project.model';

export class Profile implements Deserializable {
    _id:            any;
    uri:            string;
    active:         boolean;
    name:           string;
    landing:        any;
    about:          any;
    projects:       Array<Project>;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}