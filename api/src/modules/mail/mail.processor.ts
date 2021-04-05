import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';

import { Job } from 'bull';
import { plainToClass } from 'class-transformer';

import { ExtendedLogger } from '@api/core/utils/extended-logger';
import { UtilsService } from '@api/core/utils/utils.service';

import { ShopCustomer } from '@api/modules/shop/entities/shop-customer.entity';
import { ShopOrder } from '@api/modules/shop/entities/shop-order.entity';

import {
    FailedToSendMultiDownloadEmailException,
    FailedToSendOrderConfirmationEmailException
} from './mail.exception';

@Processor(process.env.REDIS_NAME)
export class MailProcessor {
    private readonly logger = new ExtendedLogger(this.constructor.name)

    constructor(
        private readonly mailerService: MailerService,
        private readonly utilsService: UtilsService
    ) { }

    @OnQueueActive()
    private onActive(job: Job): void {
        this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
    }

    @OnQueueCompleted()
    private onCompleted(job: Job, result: any): void {
        this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`);
    }

    @OnQueueFailed()
    private onFailed(job: Job, error: any): void {
        this.logger.debug(`Failed job ${job.id} of type ${job.name}. Error: ${error.message}`, error.stack);
    }

    @Process('multi-download')
    private async sendMultiDownloadEmail(job: Job<{ customer: ShopCustomer, orders: ShopOrder[], signedUrls: string[] }>): Promise<any> {
        await this.mailerService.sendMail({
            template: 'multi-download',
            context: {
                ...plainToClass(ShopCustomer, job.data.customer),
                orders: this.utilsService.zip(job.data.orders, job.data.signedUrls)
            },
            subject: `Download URL(s) | mattmaxwell.dev`,
            to: job.data.customer.email
        })
            .then((res: any) => {
                this.logger.log(`Sending multi download email to ${job.data.customer.email}`);
                return res;
            })
            .catch((error) => {
                this.logger.error(`Failed to send multi download email to ${job.data.customer.email}`, error.stack);
                throw new FailedToSendMultiDownloadEmailException();
            });
    }

    @Process('confirmation')
    private async sendOrderConfirmationEmail(job: Job<{ order: ShopOrder, signedUrl: string }>): Promise<any> {
        const isFreeOrder: boolean = job.data.order.amount <= 0.0;
        await this.mailerService.sendMail({
            template: `${isFreeOrder ? 'download' : 'order'}-confirmation`,
            context: {
                ...plainToClass(ShopOrder, job.data.order),
                signedUrl: job.data.signedUrl
            },
            subject: `${job.data.order.product.name} | ${isFreeOrder ? 'Download' : 'Order'} Confirmation | mattmaxwell.dev`,
            to: job.data.order.customer.email
        })
        .then((res: any) => {
            this.logger.log(`Sent order download email to ${job.data.order.customer.email}`);
            return res;
        })
        .catch((error) => {
            this.logger.error(`Failed to send order confirmation email to ${job.data.order.customer.email}`, error.stack);
            throw new FailedToSendOrderConfirmationEmailException();
        });
    }
}
