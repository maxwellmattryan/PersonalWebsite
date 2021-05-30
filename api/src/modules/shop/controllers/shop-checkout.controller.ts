import { Body, Controller, Get, HttpCode, HttpService, HttpStatus, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GCloudStorageService } from '@api/core/gcloud/gcloud-storage.service';
import { Id } from '@api/core/database/entity.service';

import { MailService } from '@api/modules/mail/mail.service';

import { ShopCustomer } from "../entities/shop-customer.entity";
import { ShopProduct } from "../entities/shop-product.entity";

import { ShopCheckoutService } from '../services/shop-checkout.service';
import { ShopOrderService } from '../services/shop-order.service';
import { ShopProductService } from '@api/modules/shop/services/shop-product.service';

import { InvalidCheckoutSessionException } from '../exceptions/shop-checkout.exception';
import { ShopProductWasNotFoundException } from '@api/modules/shop/exceptions/shop-product.exception';

@Controller('shop/checkout')
export class ShopCheckoutController {
    constructor(
        private readonly configService: ConfigService,
        private readonly gCloudStorageService: GCloudStorageService,
        private readonly httpService: HttpService,
        private readonly mailService: MailService,
        private readonly shopCheckoutService: ShopCheckoutService,
        private readonly shopOrderService: ShopOrderService,
        private readonly shopProductService: ShopProductService
    ) { }

    @Get('init')
    @HttpCode(HttpStatus.OK)
    public async createCheckoutSession(
        @Query('productId') productId: Id
    ): Promise<{id: string}> {
        const product: ShopProduct = await this.shopProductService.getProduct(productId);
        if(!product) throw new ShopProductWasNotFoundException();

        return this.shopCheckoutService.getCheckoutSessionId(product);
    }

    @Post('complete')
    @HttpCode(HttpStatus.CREATED)
    public async completeCheckoutSession(
        @Query('isFreeProduct') isFreeProduct: boolean,
        @Query('productId') productId: Id,
        @Query('sessionId') sessionId: string,
        @Body() customerData: ShopCustomer
    ): Promise<any> {
        if(!(productId && (sessionId || isFreeProduct)))
            throw new InvalidCheckoutSessionException();

        let order = await (isFreeProduct ?
            this.shopCheckoutService.getFreeCheckoutOrder(customerData.email, productId)
            : this.shopCheckoutService.getCheckoutOrder(sessionId, productId)
        );

        if(!order.has_sent_email) {
            const signedUrl = await this.gCloudStorageService.getSignedUrl('products', order.product.filename);

            await this.mailService.sendConfirmationEmail(order, signedUrl);

            order = await this.shopOrderService.updateOrder(order.id, order);
        }

        return order;
    }
}
