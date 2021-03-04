import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService, Id } from "@api/core/database/entity.service";
import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';

import { ShopCustomer } from '../entities/shop-customer.entity';
import { ShopCustomerAlreadyExistsException } from '../exceptions/shop-customer.exception';

@Injectable()
export class ShopCustomerService extends EntityService<ShopCustomer> {
    constructor(
        @InjectRepository(ShopCustomer)
        private readonly shopCustomerRepository: Repository<ShopCustomer>
    ) { super(); }

    public async existsInTable(id: Id = -1, email: string = ''): Promise<boolean> {
        return await this.shopCustomerRepository
            .createQueryBuilder('sc')
            .where('sc.id = :id', { id: id })
            .orWhere('sc.email = :email', { email: email })
            .getCount() > 0;
    }

    public async createCustomer(customerData: ShopCustomer): Promise<ShopCustomer> {
        const customer: ShopCustomer = this.createEntity(
            this.shopCustomerRepository.create(customerData),
            ['email']
        );

        return this.shopCustomerRepository.save(customer)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION)
                    throw new ShopCustomerAlreadyExistsException();
                else
                    throw new InternalServerErrorException();
            });
    }

    public async getCustomer(id: Id = -1, email: string = ''): Promise<ShopCustomer> {
        return this.shopCustomerRepository
            .createQueryBuilder('sc')
            .where('sc.id = :id', { id: id })
            .orWhere('sc.email = :email', { email: email })
            .getOne();
    }
}
