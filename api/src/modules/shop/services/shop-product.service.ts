import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ShopProduct } from '../entities/shop-product.entity';

@Injectable()
export class ShopProductService {
    constructor(
        @InjectRepository(ShopProduct)
        private readonly shopProductRepository: Repository<ShopProduct>
    ) { }

    public async getProducts(): Promise<ShopProduct[]> {
        return await this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .getMany();
    }
}
