import { Controller, HttpCode, HttpService, Post, Query, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';

import { Request } from 'express';

import { ShopCheckoutService } from '../services/shop-checkout.service';
import { ShopCustomerService } from '../services/shop-customer-service.service';
import { ShopOrderService } from '../services/shop-order.service';
import { ShopProductService } from '../services/shop-product.service';

import { ShopCustomer } from '../entities/shop-customer.entity';
import { ShopOrder } from '../entities/shop-order.entity';
import { ShopProduct } from '../entities/shop-product.entity';

import { InvalidShopProductException } from '@api/modules/shop/exceptions/shop-product.exception';
import { InvalidStripeSessionIdException } from '../exceptions/stripe.exception';

@Controller('shop/checkout')
export class ShopCheckoutController {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
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
                    throw new InvalidStripeSessionIdException()
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
}
