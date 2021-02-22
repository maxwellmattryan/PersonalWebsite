import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/exceptions/http.exception';

import { ShopOrder } from '../entities/shop-order.entity';
import { ShopOrderAlreadyExistsException } from '@api/modules/shop/exceptions/shop-order.exception';

@Injectable()
export class ShopOrderService {
    constructor(
        @InjectRepository(ShopOrder)
        private readonly shopOrderRepository: Repository<ShopOrder>
    ) { }

    public async hasBeenMadeBefore(customerId: number, productId: number): Promise<boolean> {
        return await this.shopOrderRepository
            .createQueryBuilder('so')
            .where('so.customer = :customer', { customer: customerId})
            .andWhere('so.product = :product', { product: productId })
            .getCount() > 1;
    }

    public async createOrder(orderData: ShopOrder): Promise<ShopOrder> {
        const order: ShopOrder = this.shopOrderRepository.create(orderData);
        await this.shopOrderRepository.save(order)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
                    throw new ShopOrderAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });

        return await this.getOrder(order.id);
    }

    public async getOrder(id: number): Promise<ShopOrder> {
        return await this.shopOrderRepository
            .createQueryBuilder('so')
            .leftJoinAndSelect('so.product', 'sp')
            .leftJoinAndSelect('so.customer', 'sc')
            .where('so.id = :id', { id: id })
            .getOne();
    }

    public async getOrderByCustomerAndProduct(customerId: number, productId: number): Promise<ShopOrder> {
        return await this.shopOrderRepository
            .createQueryBuilder('so')
            .leftJoinAndSelect('so.product', 'sp')
            .leftJoinAndSelect('so.customer', 'sc')
            .where('so.customer = :customer', { customer: customerId })
            .andWhere('so.product = :product', { product: productId })
            .getOne();
    }
}
