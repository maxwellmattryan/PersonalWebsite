import { Deserializable } from './deserializable.model';
import { Profile } from './profile.model';

export class Project implements Deserializable {
    _id:            any;
    uri:            string;
    title:          string;
    subtitle:       string;
    profiles:       Array<Profile>;
    preview:        string;
    description:    string;
    imageURL:       string;
    externals:      Array<Object>;

    deserialize(input: any): this {
        Object.assign(this, input);

        this.profiles = input.profiles.map(p => new Profile().deserialize(p));

        return this;
    }
}