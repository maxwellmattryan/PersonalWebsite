import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';
import { Id } from '@api/core/database/entity.service';

import { ShopCategory } from '../entities/shop-category.entity';
import { ShopCategoryService } from '../services/shop-category.service';
import { ShopCategoriesWereNotFoundException, ShopCategoryCouldNotBeUpdatedException, ShopCategoryWasNotFoundException } from '../exceptions/shop-category.exception';

@Controller('shop/categories')
export class ShopCategoryController {
    constructor(
        private readonly shopCategoryService: ShopCategoryService
    ) { }

    @Get('')
    @HttpCode(200)
    public async getCategories(): Promise<ShopCategory[]> {
        const categories = await this.shopCategoryService.getCategories();
        if(categories.length === 0) throw new ShopCategoriesWereNotFoundException();

        return categories;
    }

    @Post('')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    public async createCategory(
        @Body() categoryData: ShopCategory
    ): Promise<ShopCategory> {
        return this.shopCategoryService.createCategory(categoryData);
    }

    @Get(':id')
    @HttpCode(200)
    public async getCategory(
        @Param('id') id: Id
    ): Promise<ShopCategory> {
        const category = await this.shopCategoryService.getCategory(id);
        if(!category) throw new ShopCategoryWasNotFoundException();

        return category;
    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    public async updateCategory(
        @Param('id') id: Id,
        @Body() categoryData: ShopCategory
    ): Promise<ShopCategory> {
        const category = await this.shopCategoryService.updateCategory(id, categoryData);
        if(!category) throw new ShopCategoryCouldNotBeUpdatedException();

        return category;
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    public async deleteCategory(
        @Param('id') id: Id
    ): Promise<void> {
        if(!(await this.shopCategoryService.existsInTable(id)))
            throw new ShopCategoryWasNotFoundException();

        await this.shopCategoryService.deleteCategory(id);
    }
}
