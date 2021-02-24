import { Controller, HttpCode, HttpService, Post, Query, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';

import { GCloudStorageService } from '@api/core/gcloud/gcloud-storage.service';

import { MailService } from '@api/modules/mail/mail.service';

import { ShopCheckoutService } from '../services/shop-checkout.service';

import { InvalidCheckoutSessionException } from '../exceptions/shop-checkout.exception';

@Controller('shop/checkout')
export class ShopCheckoutController {
    constructor(
        private readonly configService: ConfigService,
        private readonly gCloudStorageService: GCloudStorageService,
        private readonly httpService: HttpService,
        private readonly mailService: MailService,
        private readonly shopCheckoutService: ShopCheckoutService
    ) { }

    @Post('init')
    @HttpCode(201)
    public async createCheckoutSession(@Req() request: Request): Promise<{id: string}> {
        return this.shopCheckoutService.getCheckoutSessionId(request.body);
    }

    @Post('complete')
    @HttpCode(200)
    public async completeCheckoutSession(@Query() query, @Req() request: Request): Promise<any> {
        const isFreeOrder: boolean = query.freeProduct === 'true';
        if(isNaN(Number(query.productId)) ||
            (query.sessionId == undefined && !isFreeOrder) ||
            (query.sessionId != undefined && (isFreeOrder || query.freeProduct != undefined)))
            throw new InvalidCheckoutSessionException();

        const order = await (isFreeOrder ?
            this.shopCheckoutService.getFreeCheckoutOrder(request.body.email, query.productId)
            : this.shopCheckoutService.getCheckoutOrder(query.sessionId, query.productId)
        );

        const signedUrl = await this.gCloudStorageService.getSignedUrl(order.product.filename);

        await this.mailService.sendOrderConfirmationEmail(order, signedUrl);

        return order;
    }
}
