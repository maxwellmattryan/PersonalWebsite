import { Repository } from 'typeorm';
import { EntityService, Id } from '@api/core/database/entity.service';
import { ShopProductStatus } from '../entities/shop-product-status.entity';
export declare class ShopProductStatusService extends EntityService<ShopProductStatus> {
    private readonly shopProductStatusRepository;
    constructor(shopProductStatusRepository: Repository<ShopProductStatus>);
    getStatus(status: ShopProductStatus | Id): Promise<ShopProductStatus>;
    getStatuses(): Promise<ShopProductStatus[]>;
}
