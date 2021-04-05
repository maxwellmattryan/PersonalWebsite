import { Request } from 'express';
import { ShopOrder } from '../entities/shop-order.entity';
import { ShopOrderService } from '../services/shop-order.service';
export declare class ShopOrderController {
    private readonly shopOrderService;
    constructor(shopOrderService: ShopOrderService);
    createOrder(request: Request): Promise<ShopOrder>;
}
