import { Controller, Get, HttpCode, Req } from '@nestjs/common';

import { Request } from 'express';

import { ShopProduct } from '../entities/shop-product.entity';
import { ShopProductService } from '../services/shop-product.service';
import { ShopProductsWereNotFoundException } from '../exceptions/shop-product.exception';

@Controller('shop/products')
export class ShopProductController {
    constructor(
        private readonly shopProductService: ShopProductService
    ) { }

    @Get('')
    @HttpCode(200)
    public async getProducts(@Req() request: Request): Promise<ShopProduct[]> {
        const products: ShopProduct[] = await this.shopProductService.getProducts();
        if(!products) throw new ShopProductsWereNotFoundException();

        return products;
    }
}
