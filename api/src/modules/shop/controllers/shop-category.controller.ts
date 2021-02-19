import { Controller, Get, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { ShopCategory } from '../entities/shop-category.entity';
import { ShopCategoryService } from '../services/shop-category.service';
import { ShopCategoriesWereNotFoundException, ShopCategoryCouldNotBeUpdatedException, ShopCategoryWasNotFoundException } from '../exceptions/shop-category.exception';

@Controller('shop/categories')
export class ShopCategoryController {
    constructor(
        private readonly shopCategoryService: ShopCategoryService
    ) { }

    @Post('')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    public async createCategory(@Req() request: Request): Promise<ShopCategory> {
        return await this.shopCategoryService.createCategory(request.body);
    }

    @Get(':id')
    @HttpCode(200)
    public async getCategory(@Param('id') id: number, @Req() request: Request): Promise<ShopCategory> {
        const category = await this.shopCategoryService.getCategory(id);
        if(!category) throw new ShopCategoryWasNotFoundException();

        return category;
    }

    @Get('')
    @HttpCode(200)
    public async getCategories(@Req() request: Request): Promise<ShopCategory[]> {
        const categories = await this.shopCategoryService.getCategories();
        if(!categories) throw new ShopCategoriesWereNotFoundException();

        return categories;
    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    public async updateCategory(@Param('id') id: number, @Req() request: Request): Promise<ShopCategory> {
        const category = await this.shopCategoryService.updateCategory(id, request.body);
        if(!category) throw new ShopCategoryCouldNotBeUpdatedException();

        return category;
    }
}
