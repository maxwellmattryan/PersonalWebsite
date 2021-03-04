import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService, Id } from '@api/core/database/entity.service';
import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';

import { ShopCategory } from '../entities/shop-category.entity';
import { ShopProduct } from '../entities/shop-product.entity';
import { ShopProductStatus } from '../entities/shop-product-status.entity';

import { ShopProductStatusService } from '../services/shop-product-status.service';

import { ShopProductAlreadyExistsException } from '../exceptions/shop-product.exception';

@Injectable()
export class ShopProductService extends EntityService<ShopProduct> {
    constructor(
        @InjectRepository(ShopProduct)
        private readonly shopProductRepository: Repository<ShopProduct>,
        private readonly shopProductStatusService: ShopProductStatusService
    ) { super(); }

    public async existsInTable(id: Id): Promise<boolean> {
        return await this.shopProductRepository
            .createQueryBuilder('sp')
            .where('sp.id = :id', { id: id })
            .getCount() > 0;
    }

    public async createProduct(productData: ShopProduct): Promise<ShopProduct> {
        const product: ShopProduct = this.createEntity(
            this.shopProductRepository.create(productData),
            ['name']
        );

        return this.shopProductRepository.save(product)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
                    throw new ShopProductAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });
    }

    public async getProduct(id: Id): Promise<ShopProduct> {
        return this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .where('sp.id = :id', { id: id })
            .getOne();
    }

    public async getProducts(): Promise<ShopProduct[]> {
        return this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .getMany();
    }

    public async getProductsByCategory(category: ShopCategory | Id): Promise<ShopProduct[]> {
        return this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .where(`sc.name = :name`, { name: (category as ShopCategory).name || '' })
            .orWhere(`sc.id = :id`, { id: (category as ShopCategory).id || category })
            .getMany();
    }

    public async getProductsByStatus(status: ShopProductStatus | Id): Promise<ShopProduct[]> {
        return this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .where(`sp.status_id = :statusId`, { statusId: (status as ShopProductStatus).id || status })
            .getMany();
    }

    public async getProductsByStatusAndCategory(statusId: Id, categoryId: Id): Promise<ShopProduct[]> {
        return this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .where(`sp.category_id = :categoryId`, { categoryId: categoryId })
            .andWhere(`sp.status_id = :statusId`, { statusId: statusId })
            .getMany();
    }

    public async updateProduct(id: Id, productData: ShopProduct): Promise<ShopProduct> {
        const newProduct = new ShopProduct({ id: id, ...productData });
        return this.shopProductRepository.save(newProduct);
    }

    public async deleteProduct(id: Id): Promise<void> {
        await this.shopProductRepository
            .createQueryBuilder()
            .delete()
            .from(ShopProduct)
            .where('shop_product.id = :id', { id: id })
            .execute()
            .catch((error) => {
                if(error.code === PostgresErrorCodes.FOREIGN_KEY_VIOLATION)
                    this.softDeleteProduct(id);
                else
                    throw new InternalServerErrorException();
            });
    }

    public async softDeleteProduct(id: Id): Promise<void> {
        let product: ShopProduct = await this.getProduct(id);

        if(product.status.status === 'REMOVED') return;

        product.name += '_';
        product.status = await this.shopProductStatusService.getStatus('REMOVED');

        await this.shopProductRepository.save(product);
    }
}
