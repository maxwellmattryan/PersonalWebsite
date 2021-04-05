import { Id } from '@api/core/database/entity.service';
import { ShopProduct } from '../entities/shop-product.entity';
export declare class ShopProductStatus {
    constructor(partial: Partial<ShopProductStatus>);
    id?: Id;
    products: ShopProduct[];
    status: string;
    created_at?: Date;
    updated_at?: Date;
}
export declare enum ShopProductStatuses {
    AVAILABLE = "AVAILABLE",
    UNAVAILABLE = "UNAVAILABLE",
    DISCONTINUED = "DISCONTINUED",
    REMOVED = "REMOVED"
}
