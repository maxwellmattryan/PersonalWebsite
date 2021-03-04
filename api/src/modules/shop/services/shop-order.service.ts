import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { EntityService, Id } from '@api/core/database/entity.service';
import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';

import { ShopOrder } from '../entities/shop-order.entity';

import { ShopOrderAlreadyExistsException } from '../exceptions/shop-order.exception';

@Injectable()
export class ShopOrderService extends EntityService<ShopOrder> {
    constructor(
        @InjectRepository(ShopOrder)
        private readonly shopOrderRepository: Repository<ShopOrder>
    ) { super(); }

    public async hasBeenMadeBefore(customerId: Id, productId: Id): Promise<boolean> {
        return await this.shopOrderRepository
            .createQueryBuilder('so')
            .where('so.customer_id = :customerId', { customerId: customerId})
            .andWhere('so.product_id = :product', { productId: productId })
            .getCount() > 1;
    }

    public async createOrder(orderData: ShopOrder): Promise<ShopOrder> {
        const order: ShopOrder = this.createEntity(
            this.shopOrderRepository.create(orderData),
            ['customer', 'product']
        );

        return this.shopOrderRepository.save(order)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
                    throw new ShopOrderAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });
    }

    public async getOrder(id: Id): Promise<ShopOrder> {
        return this.shopOrderRepository
            .createQueryBuilder('so')
            .leftJoinAndSelect('so.product', 'sp')
            .leftJoinAndSelect('so.customer', 'sc')
            .where('so.id = :id', { id: id })
            .getOne();
    }

    public async getOrderByCustomerAndProduct(customerId: Id, productId: Id): Promise<ShopOrder> {
        return this.shopOrderRepository
            .createQueryBuilder('so')
            .leftJoinAndSelect('so.product', 'sp')
            .leftJoinAndSelect('so.customer', 'sc')
            .where('so.customer_id = :customerId', { customerId: customerId })
            .andWhere('so.product_id = :productId', { productId: productId })
            .getOne();
    }
    
    public async getOrdersByCustomer(customerId: Id): Promise<ShopOrder[]> {
        return this.shopOrderRepository
            .createQueryBuilder('so')
            .leftJoinAndSelect('so.product', 'sp')
            .leftJoinAndSelect('so.customer', 'sc')
            .where('sc.id = :customerId', { customerId: customerId })
            .getMany();
    }

    public async updateOrder(id: Id, orderData: ShopOrder, hasSentEmail: boolean = true): Promise<ShopOrder> {
        const newOrder = this.createEntity(
            new ShopOrder({...orderData, has_sent_email: hasSentEmail }),
            ['customer', 'product']
        );
        return this.shopOrderRepository.save(newOrder);
    }
}
