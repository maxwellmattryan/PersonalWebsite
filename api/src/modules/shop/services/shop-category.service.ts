import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { getConnection, In, Repository } from 'typeorm';

import { EntityService, Id } from "@api/core/database/entity.service";
import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';

import { ShopCategory } from '../entities/shop-category.entity';
import {
    ShopCategoryAlreadyExistsException,
    ShopCategoryCouldNotBeDeletedException, ShopCategoryCouldNotBeUpdatedException
} from '../exceptions/shop-category.exception';
import { ShopProduct } from '../entities/shop-product.entity';

@Injectable()
export class ShopCategoryService extends EntityService<ShopCategory> {
    constructor(
        @InjectRepository(ShopCategory)
        private readonly shopCategoryRepository: Repository<ShopCategory>
    ) { super(); }

    public async existsInTable(id: Id): Promise<boolean> {
        return await this.shopCategoryRepository
            .createQueryBuilder('sc')
            .where('sc.id = :id', { id: id })
            .getCount() > 0;
    }

    public async createCategory(categoryData: ShopCategory): Promise<ShopCategory> {
        const category: ShopCategory = this.createEntity(
            this.shopCategoryRepository.create(categoryData),
            ['name']
        );

        return this.shopCategoryRepository.save(category)
            .catch((error) => {
               if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION)
                   throw new ShopCategoryAlreadyExistsException();
               else
                   throw new InternalServerErrorException();
            });
    }

    public async getCategory(id: Id): Promise<ShopCategory> {
        return this.shopCategoryRepository
            .createQueryBuilder('sc')
            .where('sc.id = :id', { id: id })
            .getOne();
    }

    public async getCategories(): Promise<ShopCategory[]> {
        return this.shopCategoryRepository
            .createQueryBuilder('sc')
            .getMany();
    }

    public async updateCategory(id: Id, categoryData: ShopCategory): Promise<ShopCategory> {
        const newCategory = new ShopCategory({ id: id, name: categoryData.name });

        if(categoryData.products) {
            await getConnection()
                .createQueryBuilder()
                .update(ShopProduct)
                .set({ category: newCategory })
                .where({ id: In(categoryData.products.map(p => p.id)) })
                .execute();
        }

        return this.shopCategoryRepository.save(newCategory)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.NOT_NULL_VIOLATION)
                    throw new ShopCategoryCouldNotBeUpdatedException();
                else
                    throw new InternalServerErrorException();
            });
    }

    public async deleteCategory(id: Id): Promise<void> {
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