import { Repository } from 'typeorm';
import { EntityService, Id } from '@api/core/database/entity.service';
import { ShopCategory } from '../entities/shop-category.entity';
export declare class ShopCategoryService extends EntityService<ShopCategory> {
    private readonly shopCategoryRepository;
    constructor(shopCategoryRepository: Repository<ShopCategory>);
    existsInTable(id: Id): Promise<boolean>;
    createCategory(categoryData: ShopCategory): Promise<ShopCategory>;
    getCategory(id: Id): Promise<ShopCategory>;
    getCategories(): Promise<ShopCategory[]>;
    updateCategory(id: Id, categoryData: ShopCategory): Promise<ShopCategory>;
    deleteCategory(id: Id): Promise<void>;
}
