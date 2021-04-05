import { Id } from '@api/core/database/entity.service';
import { ShopOrder } from './shop-order.entity';
export declare class ShopCustomer {
    constructor(partial: Partial<ShopCustomer>);
    id?: Id;
    orders: ShopOrder[];
    email: string;
    created_at?: Date;
    updated_at?: Date;
}
