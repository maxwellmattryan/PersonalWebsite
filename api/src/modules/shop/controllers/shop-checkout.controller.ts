import { Body, Controller, HttpCode, HttpService, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GCloudStorageService } from '@api/core/gcloud/gcloud-storage.service';
import { Id } from '@api/core/database/entity.service';

import { MailService } from '@api/modules/mail/mail.service';

import { ShopCustomer } from "../entities/shop-customer.entity";
import { ShopProduct } from "../entities/shop-product.entity";

import { ShopCheckoutService } from '../services/shop-checkout.service';
import { ShopOrderService } from '../services/shop-order.service';

import { InvalidCheckoutSessionException } from '../exceptions/shop-checkout.exception';

@Controller('shop/checkout')
export class ShopCheckoutController {
    constructor(
        private readonly configService: ConfigService,
        private readonly gCloudStorageService: GCloudStorageService,
        private readonly httpService: HttpService,
        private readonly mailService: MailService,
        private readonly shopCheckoutService: ShopCheckoutService,
        private readonly shopOrderService: ShopOrderService
    ) { }

    @Post('init')
    @HttpCode(201)
    public async createCheckoutSession(
        @Body() productData: ShopProduct
    ): Promise<{id: string}> {
        return this.shopCheckoutService.getCheckoutSessionId(productData);
    }

    @Post('complete')
    @HttpCode(200)
    public async completeCheckoutSession(
        @Query('productId') productId: Id,
        @Query('sessionId') sessionId: string,
        @Query('isFreeProduct') isFreeProduct: boolean,
        @Body() customerData: ShopCustomer
    ): Promise<any> {
        if(isNaN(Number(productId)) ||
            (sessionId == undefined && !isFreeProduct) ||
            (sessionId != undefined && (isFreeProduct || isFreeProduct != undefined)))
            throw new InvalidCheckoutSessionException();

        let order = await (isFreeProduct ?
            this.shopCheckoutService.getFreeCheckoutOrder(customerData.email, productId)
            : this.shopCheckoutService.getCheckoutOrder(sessionId, productId)
        );

        if(!order.has_sent_email) {
            const signedUrl = await this.gCloudStorageService.getSignedUrl(order.product.filename);

            await this.mailService.sendConfirmationEmail(order, signedUrl);

            order = await this.shopOrderService.updateOrder(order.id, order);
        }


        return order;
    }
}
