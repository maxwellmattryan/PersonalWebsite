import { Controller, Get, HttpCode, Param, Req } from '@nestjs/common';

import { Request } from 'express';

import { ShopCategory } from '../entities/shop-category.entity';
import { ShopCategoriesWereNotFoundException, ShopCategoryWasNotFoundException } from '../exceptions/shop-category.exception';
import { ShopCategoryService } from '../services/shop-category.service';

@Controller('shop/categories')
export class ShopCategoryController {
    constructor(
        private readonly shopCategoryService: ShopCategoryService
    ) { }

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
}
