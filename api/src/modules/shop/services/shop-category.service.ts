import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { getConnection, In, Repository } from 'typeorm';

import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/exceptions/http.exception';

import { ShopCategory } from '../entities/shop-category.entity';
import {
    ShopCategoryAlreadyExistsException,
    ShopCategoryCouldNotBeDeletedException, ShopCategoryCouldNotBeUpdatedException
} from '../exceptions/shop-category.exception';
import { ShopProduct } from '../entities/shop-product.entity';

@Injectable()
export class ShopCategoryService {
    constructor(
        @InjectRepository(ShopCategory)
        private readonly shopCategoryRepository: Repository<ShopCategory>
    ) { }

    public async existsInTable(id: number): Promise<boolean> {
        return await this.shopCategoryRepository
            .createQueryBuilder('sc')
            .where('sc.id = :id', { id: id })
            .getCount() > 0;
    }

    public async createCategory(categoryData: ShopCategory): Promise<ShopCategory> {
        const category: ShopCategory = this.shopCategoryRepository.create(categoryData);
        await this.shopCategoryRepository.save(category)
            .catch((error) => {
               if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION)
                   throw new ShopCategoryAlreadyExistsException();
               else
                   throw new InternalServerErrorException();
            });

        return await this.getCategory(category.id);
    }

    public async getCategory(id: number): Promise<ShopCategory> {
        return await this.shopCategoryRepository
            .createQueryBuilder('sc')
            .where('sc.id = :id', { id: id })
            .getOne();
    }

    public async getCategories(): Promise<ShopCategory[]> {
        return await this.shopCategoryRepository
            .createQueryBuilder('sc')
            .getMany();
    }

    public async updateCategory(id: number, categoryData: ShopCategory): Promise<ShopCategory> {
        const newCategory = new ShopCategory({ id: id, name: categoryData.name });
        await this.shopCategoryRepository.update(id, newCategory)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.NOT_NULL_VIOLATION)
                    throw new ShopCategoryCouldNotBeUpdatedException();
                else
                    throw new InternalServerErrorException();
            });

        if(categoryData.products) {
            await getConnection()
                .createQueryBuilder()
                .update(ShopProduct)
                .set({ category: newCategory })
                .where({ id: In(categoryData.products.map(p => p.id)) })
                .execute();
        }

        return await this.getCategory(id);
    }

    public async deleteCategory(id: number): Promise<void> {
        await this.shopCategoryRepository
            .createQueryBuilder()
            .delete()
            .from(ShopCategory)
            .where('shop_category.id = :id', { id: id })
            .execute()
            .catch((error) => {
                if(error.code === PostgresErrorCodes.FOREIGN_KEY_VIOLATION)
                    throw new ShopCategoryCouldNotBeDeletedException();
                else
                    throw new InternalServerErrorException();
            })
    }
}