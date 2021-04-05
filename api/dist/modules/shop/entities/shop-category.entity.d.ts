import { Id } from '@api/core/database/entity.service';
import { ShopProduct } from './shop-product.entity';
export declare class ShopCategory {
    constructor(partial: Partial<ShopCategory>);
    id?: Id;
    products: ShopProduct[];
    name: string;
    created_at?: Date;
    updated_at?: Date;
}
