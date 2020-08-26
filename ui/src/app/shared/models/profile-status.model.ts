import { Deserializable } from '@app/shared/models/deserializable.model';

export class ProfileStatus implements Deserializable {
    id?: number;
    status: string;

    constructor(partial: Partial<ProfileStatus>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
