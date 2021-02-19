import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ShopProductStatus } from '../entities/shop-product-status.entity';

@Injectable()
export class ShopProductStatusService {
    constructor(
        @InjectRepository(ShopProductStatus)
        private readonly shopProductStatusRepository: Repository<ShopProductStatus>
    ) { }

    public async getStatus(status: ShopProductStatus | number | string): Promise<ShopProductStatus> {
        return await this.shopProductStatusRepository
            .createQueryBuilder('sps')
            .where('sps.status = :status', { status: (status as ShopProductStatus).status || typeof status === 'string' ? status : '' })
            .orWhere('sps.id = :id', { id: (status as ShopProductStatus).id || isNaN(Number(status)) ? -1 : status })
            .getOne();
    }

    public async getStatuses(): Promise<ShopProductStatus[]> {
        return await this.shopProductStatusRepository
            .createQueryBuilder('sps')
            .getMany();
    }
}
