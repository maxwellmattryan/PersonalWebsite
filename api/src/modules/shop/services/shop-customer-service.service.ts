import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/exceptions/http.exception';

import { ShopCustomer } from '../entities/shop-customer.entity';
import { ShopCustomerAlreadyExistsException } from '../exceptions/shop-customer.exception';

@Injectable()
export class ShopCustomerService {
    constructor(
        @InjectRepository(ShopCustomer)
        private readonly shopCustomerRepository: Repository<ShopCustomer>
    ) { }

    public async existsInTable(id: number = -1, email: string = ''): Promise<boolean> {
        return await this.shopCustomerRepository
            .createQueryBuilder('sc')
            .where('sc.id = :id', { id: id })
            .orWhere('sc.email = :email', { email: email })
            .getCount() > 0;
    }

    public async createCustomer(customerData: ShopCustomer): Promise<ShopCustomer> {
        const customer: ShopCustomer = this.shopCustomerRepository.create(customerData);
        await this.shopCustomerRepository.save(customer)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION)
                    throw new ShopCustomerAlreadyExistsException();
                else
                    throw new InternalServerErrorException();
            });

        return await this.getCustomer(customer.id);
    }

    public async getCustomer(id: number = -1, email: string = ''): Promise<ShopCustomer> {
        return await this.shopCustomerRepository
            .createQueryBuilder('sc')
            .where('sc.id = :id', { id: id })
            .orWhere('sc.email = :email', { email: email })
            .getOne();
    }
}
