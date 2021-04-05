import { Id } from '@api/core/database/entity.service';
import { ShopCategory } from '../entities/shop-category.entity';
import { ShopProductStatus } from '../entities/shop-product-status.entity';
import { ShopOrder } from './shop-order.entity';
export declare class ShopProduct {
    constructor(partial: Partial<ShopProduct>);
    id?: Id;
    orders: ShopOrder[];
    status: ShopProductStatus;
    category: ShopCategory;
    name: string;
    filename: string;
    amount: number;
    preview: string;
    description: string;
    image_url: string;
    created_at?: Date;
    updated_at?: Date;
}
