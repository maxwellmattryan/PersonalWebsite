import { Repository } from 'typeorm';
import { EntityService, Id } from '@api/core/database/entity.service';
import { ShopCategory } from '../entities/shop-category.entity';
import { ShopProduct } from '../entities/shop-product.entity';
import { ShopProductStatus } from '../entities/shop-product-status.entity';
import { ShopProductStatusService } from '../services/shop-product-status.service';
export declare class ShopProductService extends EntityService<ShopProduct> {
    private readonly shopProductRepository;
    private readonly shopProductStatusService;
    constructor(shopProductRepository: Repository<ShopProduct>, shopProductStatusService: ShopProductStatusService);
    existsInTable(id: Id): Promise<boolean>;
    createProduct(productData: ShopProduct): Promise<ShopProduct>;
    getProduct(id: Id): Promise<ShopProduct>;
    getProducts(): Promise<ShopProduct[]>;
    getProductsByCategory(category: ShopCategory | Id): Promise<ShopProduct[]>;
    getProductsByStatus(status: ShopProductStatus | Id): Promise<ShopProduct[]>;
    getProductsByStatusAndCategory(statusId: Id, categoryId: Id): Promise<ShopProduct[]>;
    updateProduct(id: Id, productData: ShopProduct): Promise<ShopProduct>;
    deleteProduct(id: Id): Promise<void>;
    softDeleteProduct(id: Id): Promise<void>;
}
