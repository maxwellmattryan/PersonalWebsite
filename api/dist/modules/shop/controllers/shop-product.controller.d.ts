import { Id } from '@api/core/database/entity.service';
import { ShopProduct } from '../entities/shop-product.entity';
import { ShopProductService } from '../services/shop-product.service';
export declare class ShopProductController {
    private readonly shopProductService;
    constructor(shopProductService: ShopProductService);
    getProducts(statusId: Id, categoryId: Id): Promise<ShopProduct[]>;
    createProduct(productData: ShopProduct): Promise<ShopProduct>;
    getProduct(id: Id): Promise<ShopProduct>;
    updateProduct(id: Id, productData: ShopProduct): Promise<ShopProduct>;
    deleteProduct(id: Id, doSoftDelete: boolean): Promise<void>;
}
