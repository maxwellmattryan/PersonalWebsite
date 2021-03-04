import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService, Id } from "@api/core/database/entity.service";

import { ShopProductStatus } from '../entities/shop-product-status.entity';

@Injectable()
export class ShopProductStatusService extends EntityService<ShopProductStatus> {
    constructor(
        @InjectRepository(ShopProductStatus)
        private readonly shopProductStatusRepository: Repository<ShopProductStatus>
    ) { super(); }

    public async getStatus(status: ShopProductStatus | Id): Promise<ShopProductStatus> {
        return this.shopProductStatusRepository
            .createQueryBuilder('sps')
            .where('sps.status = :status', { status: (status as ShopProductStatus).status || '' })
            .orWhere('sps.id = :id', { id: (status as ShopProductStatus).id || status })
            .getOne();
    }

    public async getStatuses(): Promise<ShopProductStatus[]> {
        return this.shopProductStatusRepository
            .createQueryBuilder('sps')
            .getMany();
    }
}
