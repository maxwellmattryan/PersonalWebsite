"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const postgres_error_codes_enum_1 = require("../../../core/database/postgres-error-codes.enum");
const http_exception_1 = require("../../../core/http/http.exception");
const shop_category_entity_1 = require("../entities/shop-category.entity");
const shop_category_exception_1 = require("../exceptions/shop-category.exception");
const shop_product_entity_1 = require("../entities/shop-product.entity");
let ShopCategoryService = class ShopCategoryService extends entity_service_1.EntityService {
    constructor(shopCategoryRepository) {
        super();
        this.shopCategoryRepository = shopCategoryRepository;
    }
    async existsInTable(id) {
        return await this.shopCategoryRepository
            .createQueryBuilder('sc')
            .where('sc.id = :id', { id: id })
            .getCount() > 0;
    }
    async createCategory(categoryData) {
        const category = this.createEntity(this.shopCategoryRepository.create(categoryData), ['name']);
        return this.shopCategoryRepository.save(category)
            .catch((error) => {
            if (error.code === postgres_error_codes_enum_1.PostgresErrorCodes.UNIQUE_VIOLATION)
                throw new shop_category_exception_1.ShopCategoryAlreadyExistsException();
            else
                throw new http_exception_1.InternalServerErrorException();
        });
    }
    async getCategory(id) {
        return this.shopCategoryRepository
            .createQueryBuilder('sc')
            .where('sc.id = :id', { id: id })
            .getOne();
    }
    async getCategories() {
        return this.shopCategoryRepository
            .createQueryBuilder('sc')
            .getMany();
    }
    async updateCategory(id, categoryData) {
        const newCategory = new shop_category_entity_1.ShopCategory({ id: id, name: categoryData.name });
        if (categoryData.products) {
            await typeorm_2.getConnection()
                .createQueryBuilder()
                .update(shop_product_entity_1.ShopProduct)
                .set({ category: newCategory })
                .where({ id: typeorm_2.In(categoryData.products.map(p => p.id)) })
                .execute();
        }
        return this.shopCategoryRepository.save(newCategory)
            .catch((error) => {
            if (error.code === postgres_error_codes_enum_1.PostgresErrorCodes.NOT_NULL_VIOLATION)
                throw new shop_category_exception_1.ShopCategoryCouldNotBeUpdatedException();
            else
                throw new http_exception_1.InternalServerErrorException();
        });
    }
    async deleteCategory(id) {
        await this.shopCategoryRepository
            .createQueryBuilder()
            .delete()
            .from(shop_category_entity_1.ShopCategory)
            .where('shop_category.id = :id', { id: id })
            .execute()
            .catch((error) => {
            if (error.code === postgres_error_codes_enum_1.PostgresErrorCodes.FOREIGN_KEY_VIOLATION)
                throw new shop_category_exception_1.ShopCategoryCouldNotBeDeletedException();
            else
                throw new http_exception_1.InternalServerErrorException();
        });
    }
};
ShopCategoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(shop_category_entity_1.ShopCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShopCategoryService);
exports.ShopCategoryService = ShopCategoryService;
//# sourceMappingURL=shop-category.service.js.map