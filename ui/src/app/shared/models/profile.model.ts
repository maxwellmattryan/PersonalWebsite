import { Deserializable } from './deserializable.model';
import { ProfileStatus } from './profile-status.model';

export class Profile implements Deserializable {
    id?:             number;

    status:         ProfileStatus;

    name:           string;
    tagling:        string;
    landing:        string;
    about:          string;

    createdAt:      Date;
    updatedAt:      Date;

    constructor(partial: Partial<Profile>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        this.status = input.status.map(s => new ProfileStatus({ ...s }).deserialize(s));

        return this;
    }
}
