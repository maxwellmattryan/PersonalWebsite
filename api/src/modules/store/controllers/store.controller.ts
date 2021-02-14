import { Controller, Get, HttpCode, Req } from '@nestjs/common';

import { Request } from 'express';

@Controller('store')
export class StoreController {
    constructor() { }

    @Get('')
    @HttpCode(200)
    async getStore(@Req() request: Request): Promise<string> {
        return "Welcome to the store!";
    }
}
