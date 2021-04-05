import { Request } from 'express';
import { ShopProductStatus } from '../entities/shop-product-status.entity';
import { ShopProductStatusService } from '../services/shop-product-status.service';
export declare class ShopProductStatusController {
    private readonly shopProductStatusService;
    constructor(shopProductStatusService: ShopProductStatusService);
    getStatuses(request: Request): Promise<ShopProductStatus[]>;
}
