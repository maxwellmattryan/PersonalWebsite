import { Id } from '@api/core/database/entity.service';
import { ShopCategory } from '../entities/shop-category.entity';
import { ShopCategoryService } from '../services/shop-category.service';
export declare class ShopCategoryController {
    private readonly shopCategoryService;
    constructor(shopCategoryService: ShopCategoryService);
    getCategories(): Promise<ShopCategory[]>;
    createCategory(categoryData: ShopCategory): Promise<ShopCategory>;
    getCategory(id: Id): Promise<ShopCategory>;
    updateCategory(id: Id, categoryData: ShopCategory): Promise<ShopCategory>;
    deleteCategory(id: Id): Promise<void>;
}
