import { Logger } from '@nestjs/common';
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';

import { Job } from 'bull';
import { plainToClass } from 'class-transformer';

import { ShopCustomer } from '@api/modules/shop/entities/shop-customer.entity';
import { ShopOrder } from '@api/modules/shop/entities/shop-order.entity';

import { FailedToSendOrderDownloadEmailException, FailedToSendTestEmailException } from './mail.exception';

@Processor(process.env.MAILER_QUEUE_NAME)
export class MailProcessor {
    private readonly logger = new Logger(this.constructor.name)

    constructor(
        private readonly mailerService: MailerService
    ) { }

    private formatOrderId(orderId: number | string, paddingAmount: number = 5): string {
        return String(orderId).padStart(paddingAmount, '0');
    }

    private zip(arr1: any[], arr2: any[]): any[] {
        return arr1.map((val, idx, arr) => {
            return [val, arr2[idx]];
        });
    }

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
        this.logger.log(`Sending multi download email to '${job.data.customer.email}'`);

        await this.mailerService.sendMail({
            template: 'multi-download',
            context: {
                ...plainToClass(ShopCustomer, job.data.customer),
                orders: this.zip(job.data.orders, job.data.signedUrls)
            },
            subject: `Download URL(s) | mattmaxwell.dev`,
            to: job.data.customer.email
        })
            .then((res: any) => {
                return res;
            })
            .catch((error) => {
                this.logger.error(`Failed to send multi download email to '${job.data.customer.email}'`, error.stack);
                throw new FailedToSendOrderDownloadEmailException();
            });
    }

    @Process('order-download')
    private async sendOrderDownloadEmail(job: Job<{ order: ShopOrder, signedUrl: string }>): Promise<any> {
        this.logger.log(`Sending order download email to '${job.data.order.customer.email}'`);

        const orderNumber: string = this.formatOrderId(job.data.order.id);
        await this.mailerService.sendMail({
            template: 'order-download',
            context: {
                ...plainToClass(ShopOrder, job.data.order),
                signedUrl: job.data.signedUrl,
                orderNumber: orderNumber
            },
            subject: `Download URL | ${job.data.order.product.name} | mattmaxwell.dev`,
            to: job.data.order.customer.email
        })
        .then((res: any) => {
            return res;
        })
        .catch((error) => {
            this.logger.error(`Failed to send order download email to '${job.data.order.customer.email}'`, error.stack);
            throw new FailedToSendOrderDownloadEmailException();
        });
    }

    @Process('test')
    private async sendTestEmail(job: Job<{ customer: ShopCustomer }>): Promise<any> {
        this.logger.log(`Sending test email to '${job.data.customer.email}'`);

        await this.mailerService.sendMail({
            template: 'test',
            context: {
                ...plainToClass(ShopCustomer, job.data.customer.email)
            },
            subject: `Test Email | mattmaxwell.dev`,
            to: job.data.customer.email
        })
        .then((res: any) => {
            return res;
        })
        .catch((error) => {
            this.logger.error(`Failed to send test email to '${job.data.customer.email}'`, error.stack);
            throw new FailedToSendTestEmailException();
        });
    }
}