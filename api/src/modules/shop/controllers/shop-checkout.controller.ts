import { Controller, Get, HttpCode, Req } from '@nestjs/common';

import { Request } from 'express';

import { ShopCheckoutService } from '@api/modules/shop/services/shop-checkout.service';

@Controller('shop/checkout')
export class ShopCheckoutController {
    constructor(
        private readonly shopCheckoutService: ShopCheckoutService
    ) { }

    @Get('init')
    @HttpCode(200)
    public async getCheckoutSession(@Req() request: Request): Promise<{id: string}> {
        return this.shopCheckoutService.getCheckoutSessionId(request.body);
    }
}
