import { Queue } from 'bull';
import { ShopCustomer } from '@api/modules/shop/entities/shop-customer.entity';
import { ShopOrder } from '@api/modules/shop/entities/shop-order.entity';
export declare class MailService {
    private mailQueue;
    constructor(mailQueue: Queue);
    sendMultiDownloadEmail(customer: ShopCustomer, orders: ShopOrder[], signedUrls: string[]): Promise<void>;
    sendConfirmationEmail(order: ShopOrder, signedUrl: string): Promise<void>;
}
