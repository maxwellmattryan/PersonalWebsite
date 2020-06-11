import { Deserializable } from './deserializable.model';

export class Project implements Deserializable {
    _id:            any;
    uri:            string;
    title:          string;
    subtitle:       string;
    description:    string;
    imageURL:       string;
    externals:      Array<Object>;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}