import { Controller, Get, HttpCode, HttpService, Post, Query, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';

import { Request } from 'express';

import { ShopCheckoutService } from '../services/shop-checkout.service';
import { InvalidStripeSessionIdException } from '../exceptions/stripe.exception';

@Controller('shop/checkout')
export class ShopCheckoutController {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly shopCheckoutService: ShopCheckoutService
    ) { }

    @Post('init')
    @HttpCode(201)
    public async createCheckoutSession(@Req() request: Request): Promise<{id: string}> {
        return this.shopCheckoutService.getCheckoutSessionId(request.body);
    }

    @Get('session')
    @HttpCode(200)
    public async getCheckoutSession(@Query() query, @Req() request: Request): Promise<any> {
        if(!query.id)
            throw new InvalidStripeSessionIdException();

        const url: string = 'https://api.stripe.com/v1/checkout/sessions';
        const apiKey = this.configService.get('STRIPE_API_KEY');
        const headers = { 'Authorization': `Bearer ${apiKey}` };
        return this.httpService.get(`${url}/${query.id}`, { headers: headers })
            .pipe(map(res => res.data));
    }
}
