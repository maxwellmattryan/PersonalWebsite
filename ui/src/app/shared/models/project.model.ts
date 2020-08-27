import { Deserializable } from './deserializable.model';

export class Project implements Deserializable {
    constructor(partial: Partial<Project>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        return this;
    }

    id?:          number;

    name:         string;
    tagline:      string;
    description:  string;

    image_url:    string;
    external_url: string;

    createdAt:    Date;
    updatedAt:    Date;
}
