import { Id } from '@ui/core/models/model';
import { Deserializable } from '@ui/core/models/deserializable.model';

export class ShopCustomer implements Deserializable {
    constructor(partial: Partial<ShopCustomer>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    public id?: Id;

    public email: string;

    public created_at?: Date;
    public updated_at?: Date;
}
