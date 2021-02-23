import { Controller, Get, HttpCode, HttpService, Post, Query, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';

import { Request } from 'express';

import { Storage } from '@google-cloud/storage';

import { GCloudStorageService } from '@api/core/gcloud/gcloud-storage.service';

import { MailService } from '@api/modules/mail/mail.service';

import { ShopCheckoutService } from '../services/shop-checkout.service';
import { ShopCustomerService } from '../services/shop-customer-service.service';
import { ShopOrderService } from '../services/shop-order.service';
import { ShopProductService } from '../services/shop-product.service';

import { ShopCustomer } from '../entities/shop-customer.entity';
import { ShopOrder } from '../entities/shop-order.entity';
import { ShopProduct } from '../entities/shop-product.entity';

import { InvalidCheckoutSessionException } from '../exceptions/shop-checkout.exception';
import { InvalidShopProductException } from '../exceptions/shop-product.exception';
import { InvalidStripeSessionException } from '../exceptions/stripe.exception';

@Controller('shop/checkout')
export class ShopCheckoutController {
    constructor(
        private readonly configService: ConfigService,
        private readonly gCloudStorageService: GCloudStorageService,
        private readonly httpService: HttpService,
        private readonly mailService: MailService,
        private readonly shopCheckoutService: ShopCheckoutService,
        private readonly shopCustomerService: ShopCustomerService,
        private readonly shopOrderService: ShopOrderService,
        private readonly shopProductService: ShopProductService
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

        let customer: ShopCustomer;
        let product: ShopProduct;
        let order: ShopOrder;

        if(query.freeProduct == "true") {
            customer = new ShopCustomer({
                email: (request.body as ShopCustomer).email
            });

            product = await this.shopProductService.getProduct(query.productId);
            if(product.amount > 0.0) throw new InvalidShopProductException();
        } else {
            const apiUrl = this.configService.get('STRIPE_API_URL');
            const url: string = `${apiUrl}/checkout/sessions`;

            const apiKey = this.configService.get('STRIPE_API_KEY');
            const headers = { 'Authorization': `Bearer ${apiKey}` };

            const sessionData = await this.httpService.get(`${url}/${query.sessionId}`, { headers: headers })
                .pipe(map(res => res.data), catchError(e => {
                    throw new InvalidStripeSessionException();
                })).toPromise();

            customer = new ShopCustomer({
                email: (sessionData as any).customer_details.email
            });

            product = new ShopProduct({
                id: query.productId,
                amount: sessionData.amount_total / 100.0
            });
        }

        if(await this.shopCustomerService.existsInTable(-1, customer.email))
            customer = await this.shopCustomerService.getCustomer(-1, customer.email);
        else
            customer = await this.shopCustomerService.createCustomer(customer);

        const checkedOrder = await this.shopOrderService.getOrderByCustomerAndProduct(customer.id, product.id);
        if(checkedOrder != undefined) {
            order = checkedOrder;
        } else {
            order = new ShopOrder({
                customer: customer,
                product: product,
                amount: product.amount
            });
            order = await this.shopOrderService.createOrder(order);
        }


        // TODO: 3. create signed URL with Cloud Storage


        // TODO: 4. Send email to customer with URL

        return order;
    }

    @Get('test')
    @HttpCode(200)
    public async testStuff(@Req() request: Request): Promise<any> {
        const bucket = this.gCloudStorageService.getBucket();
        const file = bucket.file('rotor.zip');

        const signedUrlOptions = {
            action: 'read',
            expires: Date.now() + 12 * 60 * 60 * 1000 // NOTE: h * m * s * ms
        };
        const signedUrl = await file.getSignedUrl((signedUrlOptions as any));
        console.log(signedUrl);

        return signedUrl;
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
