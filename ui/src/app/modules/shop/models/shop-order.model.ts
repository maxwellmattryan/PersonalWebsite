import { Deserializable } from '@ui/core/models/deserializable.model';

import { ShopCustomer } from './shop-customer.model';
import { ShopProduct } from './shop-product.model';

export class ShopOrder implements Deserializable {
    constructor(partial: Partial<ShopOrder>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        this.customer = input.customer.map(c => new ShopCustomer({ ...c }).deserialize(c));
        this.product = input.customer.map(p => new ShopProduct({ ...p }).deserialize(p));

        return this;
    }

    public id: number;

    public customer: ShopCustomer;
    public product: ShopProduct;

    public amount: number;

    public created_at?: Date;
    public updated_at?: Date;
}