import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';

import { ShopCustomer } from '@api/modules/shop/entities/shop-customer.entity';

@Injectable()
export class MailService {
    constructor(
        @InjectQueue(process.env.MAILER_QUEUE_NAME)
        private mailQueue: Queue
    ) {}

    public async sendTestEmail(customer: ShopCustomer): Promise<void> {
        await this.mailQueue.add('download', { customer })
            .catch((error) => { console.log(error); })
    }
}