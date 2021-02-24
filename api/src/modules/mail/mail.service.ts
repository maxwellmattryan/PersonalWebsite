import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';

import { ShopCustomer } from '@api/modules/shop/entities/shop-customer.entity';
import { ShopOrder } from '@api/modules/shop/entities/shop-order.entity';

@Injectable()
export class MailService {
    constructor(
        @InjectQueue(process.env.MAILER_QUEUE_NAME)
        private mailQueue: Queue
    ) { }

    public async sendMultiDownloadEmail(customer: ShopCustomer, orders: ShopOrder[], signedUrls: string[]): Promise<void> {
        await this.mailQueue.add('multi-download', { customer: customer, orders: orders, signedUrls: signedUrls })
            .catch((error) => { console.log(error); })
    }

    public async sendOrderDownloadEmail(order: ShopOrder, signedUrl: string): Promise<void> {
        await this.mailQueue.add('order-download', { order: order, signedUrl: signedUrl })
            .catch((error) => { console.log(error); })
    }

    public async sendTestEmail(customer: ShopCustomer): Promise<void> {
        await this.mailQueue.add('test', { customer })
            .catch((error) => { console.log(error); })
    }
}