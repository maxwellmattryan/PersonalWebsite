import { Deserializable } from '@ui/core/models/deserializable.model';

import { ShopProduct } from './shop-product.model';

export class ShopCategory implements Deserializable {
    constructor(partial: Partial<ShopCategory>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        this.products = input.products.map(p => new ShopProduct({ ...p }).deserialize(p));

        return this;
    }

    public id?: number;

    public products?: ShopProduct[];

    public name: string;

    public created_at?: Date;
    public updated_at?: Date;
}
