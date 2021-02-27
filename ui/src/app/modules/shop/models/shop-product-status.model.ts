import { Deserializable } from '@ui/core/models/deserializable.model';

import { ShopProduct } from './shop-product.model';

export class ShopProductStatus implements Deserializable {
    constructor(partial: Partial<ShopProductStatus>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        this.products = input.products.map(p => new ShopProduct({ ...p }).deserialize(p));

        return this;
    }

    public id?: number;

    public products?: ShopProduct[];

    public status: string;

    public created_at?: Date;
    public updated_at?: Date;
}

export enum ShopProductStatuses {
    AVAILABLE =     1,
    UNAVAILABLE =   2,
    DISCONTINUED =  3,
    REMOVED =       4
}
