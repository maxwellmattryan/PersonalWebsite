import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Not, Repository } from 'typeorm';

import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/exceptions/http.exception';

import { ShopProduct } from '../entities/shop-product.entity';
import { ShopProductStatus } from '../entities/shop-product-status.entity';
import { ShopProductStatusService } from '../services/shop-product-status.service';
import { ShopProductAlreadyExistsException } from '../exceptions/shop-product.exception';

@Injectable()
export class ShopProductService {
    constructor(
        @InjectRepository(ShopProduct)
        private readonly shopProductRepository: Repository<ShopProduct>,
        private readonly shopProductStatusService: ShopProductStatusService
    ) { }

    public async existsInTable(id: number): Promise<boolean> {
        return await this.shopProductRepository
            .createQueryBuilder('sp')
            .where('sp.id = :id', { id: id })
            .getCount() > 0;
    }

    public async createProduct(productData: ShopProduct): Promise<ShopProduct> {
        const product: ShopProduct = this.shopProductRepository.create(productData);
        await this.shopProductRepository.save(product)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
                    throw new ShopProductAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });

        return await this.getProduct(product.id);
    }

    public async getProduct(id: number): Promise<ShopProduct> {
        return await this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .where('sp.id = :id', { id: id })
            .getOne();
    }

    public async getProducts(): Promise<ShopProduct[]> {
        return await this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .getMany();
    }

    public async getProductsByStatus(status: ShopProductStatus | number | string): Promise<ShopProduct[]> {
        return await this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .where(`sps.status = :status`, { status: (status as ShopProductStatus).status || typeof status === 'string' ? status : '' })
            .orWhere(`sps.id = :id`, { id: (status as ShopProductStatus).id || isNaN(Number(status)) ? -1 : status })
            .getMany();
    }

    public async updateProduct(id: number, productData: ShopProduct): Promise<ShopProduct> {
        const newProduct = new ShopProduct({ id: id, ...productData });
        await this.shopProductRepository.save(newProduct);

        return await this.getProduct(id);
    }

    public async deleteProduct(id: number): Promise<void> {
        await this.shopProductRepository
            .createQueryBuilder()
            .delete()
            .from(ShopProduct)
            .where('shop_product.id = :id', { id: id })
            .execute();
    }

    public async softDeleteProduct(id: number): Promise<void> {
        let product: ShopProduct = await this.getProduct(id);

        if(product.status.status === 'REMOVED') return;

        product.name += '_';
        product.status = await this.shopProductStatusService.getStatus('REMOVED');

        await this.shopProductRepository.save(product);
    }
}
