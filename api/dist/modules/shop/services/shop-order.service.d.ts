import { Repository } from 'typeorm';
import { EntityService, Id } from '@api/core/database/entity.service';
import { ShopOrder } from '../entities/shop-order.entity';
export declare class ShopOrderService extends EntityService<ShopOrder> {
    private readonly shopOrderRepository;
    constructor(shopOrderRepository: Repository<ShopOrder>);
    hasBeenMadeBefore(customerId: Id, productId: Id): Promise<boolean>;
    createOrder(orderData: ShopOrder): Promise<ShopOrder>;
    getOrder(id: Id): Promise<ShopOrder>;
    getOrderByCustomerAndProduct(customerId: Id, productId: Id): Promise<ShopOrder>;
    getOrdersByCustomer(customerId: Id): Promise<ShopOrder[]>;
    updateOrder(id: Id, orderData: ShopOrder, hasSentEmail?: boolean): Promise<ShopOrder>;
}
