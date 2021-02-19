import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { ShopCustomer } from '../entities/shop-customer.entity';
import { ShopCustomerService } from '../services/shop-customer-service.service';

@Controller('shop/customers')
export class ShopCustomerControllerController {
    constructor(
        private readonly shopCustomerService: ShopCustomerService
    ) { }

    @Post('')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    public async createCustomer(@Req() request: Request): Promise<ShopCustomer> {
        return await this.shopCustomerService.createCustomer(request.body);
    }
}
