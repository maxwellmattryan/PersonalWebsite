import { Id } from '@ui/core/models/model';
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

    public id?: Id;

    public products?: ShopProduct[];

    public status: string;

    public created_at?: Date;
    public updated_at?: Date;
}

export enum ShopProductStatuses {
    AVAILABLE     = 'AXQBK7',
    UNAVAILABLE   = '5Z06AN',
    DISCONTINUED  = '85P8TU',
    REMOVED       = '2U5UC0'
}
