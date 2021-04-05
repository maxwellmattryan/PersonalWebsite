import { Repository } from 'typeorm';
import { EntityService, Id } from '@api/core/database/entity.service';
import { ShopCustomer } from '../entities/shop-customer.entity';
export declare class ShopCustomerService extends EntityService<ShopCustomer> {
    private readonly shopCustomerRepository;
    constructor(shopCustomerRepository: Repository<ShopCustomer>);
    existsInTable(id?: Id, email?: string): Promise<boolean>;
    createCustomer(customerData: ShopCustomer): Promise<ShopCustomer>;
    getCustomer(id?: Id, email?: string): Promise<ShopCustomer>;
}
