import { Controller, Get, HttpCode, HttpService, Post, Query, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';

import { GCloudStorageService } from '@api/core/gcloud/gcloud-storage.service';

import { MailService } from '@api/modules/mail/mail.service';

import { ShopCheckoutService } from '../services/shop-checkout.service';

import { ShopCustomer } from '../entities/shop-customer.entity';

import { InvalidCheckoutSessionException } from '../exceptions/shop-checkout.exception';

@Controller('shop/checkout')
export class ShopCheckoutController {
    constructor(
        private readonly configService: ConfigService,
        private readonly gCloudStorageService: GCloudStorageService,
        private readonly httpService: HttpService,
        private readonly mailService: MailService,
        private readonly shopCheckoutService: ShopCheckoutService,
    ) { }

    @Post('init')
    @HttpCode(201)
    public async createCheckoutSession(@Req() request: Request): Promise<{id: string}> {
        return this.shopCheckoutService.getCheckoutSessionId(request.body);
    }

    @Post('complete')
    @HttpCode(200)
    public async completeCheckoutSession(@Query() query, @Req() request: Request): Promise<any> {
        if(isNaN(Number(query.productId)) ||
            (query.sessionId == undefined && query.freeProduct != 'true') ||
            (query.sessionId != undefined && (query.freeProduct == 'true' || query.freeProduct != undefined)))
            throw new InvalidCheckoutSessionException();

        const isFreeOrder: boolean = query.freeProduct === 'true';
        const order = await (isFreeOrder ?
            this.shopCheckoutService.getFreeCheckoutOrder(request.body.email, query.productId)
            : this.shopCheckoutService.getCheckoutOrder(query.sessionId, query.productId)
        );

        // PASS ORDER TO GCLOUD STORAGE SERVICE
        // PASS SIGNED URLS TO MAIL SERVICE

        return order;
    }

    @Get('email')
    @HttpCode(200)
    public async testEmail(@Req() request: Request): Promise<void> {
        const customer = new ShopCustomer({
            email: 'maxwellmattryan@gmail.com'
        });
        await this.mailService.sendTestEmail(customer);
    }
}
