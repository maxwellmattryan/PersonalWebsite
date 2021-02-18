import { Deserializable } from '@ui/core/models/deserializable.model';

import { ShopCategory } from './shop-category.model';
import { ShopProductStatus } from './shop-product-status.model';

export class ShopProduct implements Deserializable {
    constructor(partial: Partial<ShopProduct>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        this.status = input.status.map(s => new ShopProductStatus({ ...s }).deserialize(s));
        this.category = input.status.map(c => new ShopCategory({ ...c }).deserialize(c));

        return this;
    }

    public id?: number;

    public status: ShopProductStatus;
    public category: ShopCategory;

    public name: string;
    public amount: number;
    public preview: string;
    public description: string;
    public image_url: string;

    public created_at?: Date;
    public updated_at?: Date;
}
