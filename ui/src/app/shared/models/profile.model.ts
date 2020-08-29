import { Deserializable } from './deserializable.model';
import { ProfileStatus } from './profile-status.model';

export class Profile implements Deserializable {
    constructor(partial: Partial<Profile>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        this.status = input.status.map(s => new ProfileStatus({ ...s }).deserialize(s));

        return this;
    }

    id?:             number;

    status:         ProfileStatus;

    name:           string;
    tagline:        string;
    landing:        string;
    about:          string;

    created_at:      Date;
    updated_at:      Date;
}
