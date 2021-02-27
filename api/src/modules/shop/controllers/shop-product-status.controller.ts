import { Controller, Get, HttpCode, Req } from '@nestjs/common';

import { Request } from 'express';

import { ShopProductStatus } from '../entities/shop-product-status.entity';
import { ShopProductStatusService } from '../services/shop-product-status.service';
import { ShopProductStatusesWereNotFoundException } from '../exceptions/shop-product-status.exception';

@Controller('shop/product-statuses')
export class ShopProductStatusController {
    constructor(
        private readonly shopProductStatusService: ShopProductStatusService
    ) { }

    @Get('')
    @HttpCode(200)
    public async getStatuses(@Req() request: Request): Promise<ShopProductStatus[]> {
        const statuses = await this.shopProductStatusService.getStatuses();
        if(statuses.length === 0) throw new ShopProductStatusesWereNotFoundException();

        return statuses;
    }
}