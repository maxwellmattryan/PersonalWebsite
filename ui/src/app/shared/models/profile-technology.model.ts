import { Deserializable } from '@app/shared/models/deserializable.model';

export class ProfileTechnology implements Deserializable {
    constructor(partial: Partial<ProfileTechnology>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    id?: number;

    name: string;
    display_order: number;
}