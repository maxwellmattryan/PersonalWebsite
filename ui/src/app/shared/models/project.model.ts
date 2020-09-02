import { Deserializable } from './deserializable.model';
import { Profile } from './profile.model';

export class Project implements Deserializable {
    constructor(partial: Partial<Project>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        this.profiles = input.profiles.map(p => new Profile({ ...p }).deserialize(p));

        return this;
    }

    id?:            number;

    profiles:       Profile[];

    name:           string;
    tagline:        string;
    description:    string;

    image_url:      string;

    link_name:      string;
    link_url:       string;

    created_at:     Date;
    updated_at:     Date;
}
