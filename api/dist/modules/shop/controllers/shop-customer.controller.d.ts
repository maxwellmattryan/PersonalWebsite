import { GCloudStorageService } from '@api/core/gcloud/gcloud-storage.service';
import { MailService } from '@api/modules/mail/mail.service';
import { ShopCustomer } from '../entities/shop-customer.entity';
import { ShopCustomerService } from '../services/shop-customer.service';
import { ShopOrderService } from '../services/shop-order.service';
export declare class ShopCustomerController {
    private readonly gCloudStorageService;
    private readonly mailService;
    private readonly shopCustomerService;
    private readonly shopOrderService;
    constructor(gCloudStorageService: GCloudStorageService, mailService: MailService, shopCustomerService: ShopCustomerService, shopOrderService: ShopOrderService);
    createCustomer(customerData: ShopCustomer): Promise<ShopCustomer>;
    helpCustomer(customerData: ShopCustomer): Promise<void>;
}
