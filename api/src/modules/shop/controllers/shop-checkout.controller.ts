import { Controller, HttpCode, HttpService, Post, Query, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';

import { request, Request } from 'express';

import { ShopCheckoutService } from '../services/shop-checkout.service';
import { ShopCustomerService } from '../services/shop-customer-service.service';
import { ShopOrderService } from '../services/shop-order.service';

import { InvalidStripeSessionIdException } from '../exceptions/stripe.exception';
import { ShopCustomer } from '@api/modules/shop/entities/shop-customer.entity';
import { ShopOrder } from '@api/modules/shop/entities/shop-order.entity';

@Controller('shop/checkout')
export class ShopCheckoutController {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly shopCheckoutService: ShopCheckoutService,
        private readonly shopCustomerService: ShopCustomerService,
        private readonly shopOrderService: ShopOrderService
    ) { }

    @Post('init')
    @HttpCode(201)
    public async createCheckoutSession(@Req() request: Request): Promise<{id: string}> {
        return this.shopCheckoutService.getCheckoutSessionId(request.body);
    }

    @Post('complete')
    @HttpCode(200)
    public async getCheckoutSession(@Query() query, @Req() request: Request): Promise<any> {
        // TODO: Handle separate cases for if product was free

        const apiUrl = this.configService.get('STRIPE_API_URL');
        const url: string = `${apiUrl}/checkout/sessions`;

        const apiKey = this.configService.get('STRIPE_API_KEY');
        const headers = { 'Authorization': `Bearer ${apiKey}` };

        const sessionData = await this.httpService.get(`${url}/${query.sessionId}`, { headers: headers })
            .pipe(map(res => res.data), catchError(e => {
                throw new InvalidStripeSessionIdException()
            })).toPromise();

        let customer = new ShopCustomer({
            email: (sessionData as any).customer_details.email
        });
        if(await this.shopCustomerService.existsInTable(-1, customer.email))
            customer = await this.shopCustomerService.getCustomer(-1, customer.email);
        else
            customer = await this.shopCustomerService.createCustomer(customer);

        let order = new ShopOrder({
            customer: customer,
            product: query.productId,
            amount: sessionData.amount_total / 100.0
        });
        order = await this.shopOrderService.createOrder(order);

        // TODO: 3. create signed URL with Cloud Storage


        // TODO: 4. Send email to customer with URL

        return order;
    }
}
