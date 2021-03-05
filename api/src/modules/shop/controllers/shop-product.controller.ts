import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';
import { Id } from '@api/core/database/entity.service';

import { ShopProduct } from '../entities/shop-product.entity';
import { ShopProductService } from '../services/shop-product.service';
import { ShopProductCouldNotBeUpdatedException, ShopProductsWereNotFoundException, ShopProductWasNotFoundException } from '../exceptions/shop-product.exception';

@Controller('shop/products')
export class ShopProductController {
    constructor(
        private readonly shopProductService: ShopProductService
    ) { }

    @Get('')
    @HttpCode(200)
    public async getProducts(
        @Query('statusId') statusId: Id,
        @Query('categoryId') categoryId: Id
    ): Promise<ShopProduct[]> {
        let products: ShopProduct[];

        if(statusId && statusId != -1) {
            if(categoryId && categoryId != -1) {
                products = await this.shopProductService.getProductsByStatusAndCategory(statusId, categoryId);
            } else {
                products = await this.shopProductService.getProductsByStatus(statusId);
            }
        } else {
            if(categoryId && categoryId != -1) {
                products = await this.shopProductService.getProductsByCategory(categoryId);
            } else {
                products = await this.shopProductService.getProducts();
            }
        }

        if(products.length === 0) throw new ShopProductsWereNotFoundException();

        return products;
    }

    @Post('')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    public async createProduct(
        @Body() productData: ShopProduct
    ): Promise<ShopProduct> {
        return this.shopProductService.createProduct(productData);
    }

    @Get(':id')
    @HttpCode(200)
    public async getProduct(
        @Param('id') id: Id,
    ): Promise<ShopProduct> {
        const product: ShopProduct = await this.shopProductService.getProduct(id);
        if(!product) throw new ShopProductWasNotFoundException();

        return product;
    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    public async updateProduct(
        @Param('id') id: Id,
        @Body() productData: ShopProduct
    ): Promise<ShopProduct> {
        const product = await this.shopProductService.updateProduct(id, productData);
        if(!product) throw new ShopProductCouldNotBeUpdatedException();

        return product;
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    public async deleteProduct(
        @Param('id') id: Id,
        @Query('doSoftDelete') doSoftDelete: boolean
    ): Promise<void> {
        if(!(await this.shopProductService.existsInTable(id)))
            throw new ShopProductWasNotFoundException();

        if(doSoftDelete)
            await this.shopProductService.softDeleteProduct(id);
        else
            await this.shopProductService.deleteProduct(id);
    }
}
