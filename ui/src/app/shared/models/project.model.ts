import { Deserializable } from './deserializable.model';
import { ProjectLink } from './project-link.model';
import { Profile } from './profile.model';

export class Project implements Deserializable {
    constructor(partial: Partial<Project>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        this.link = input.link.map(l => new ProjectLink({ ...l }).deserialize(l))

        return this;
    }

    id?:            number;

    link:           ProjectLink;
    profiles:       Profile[];

    name:           string;
    tagline:        string;
    description:    string;

    image_url:      string;

    created_at:     Date;
    updated_at:     Date;
}
