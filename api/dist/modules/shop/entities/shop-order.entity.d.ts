import { Id } from '@api/core/database/entity.service';
import { ShopCustomer } from './shop-customer.entity';
import { ShopProduct } from './shop-product.entity';
export declare class ShopOrder {
    constructor(partial: Partial<ShopOrder>);
    id?: Id;
    customer: ShopCustomer;
    product: ShopProduct;
    amount: number;
    taxed_amount: number;
    has_sent_email: boolean;
    created_at?: Date;
    updated_at?: Date;
}
