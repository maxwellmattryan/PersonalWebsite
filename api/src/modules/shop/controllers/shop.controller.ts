import { Controller, Get, HttpCode, Req } from '@nestjs/common';

import { Request } from 'express';

@Controller('shop')
export class ShopController {
    constructor() { }

    @Get('')
    @HttpCode(200)
    async getStore(@Req() request: Request): Promise<string> {
        return JSON.stringify("Welcome to the shop!");
    }
}
