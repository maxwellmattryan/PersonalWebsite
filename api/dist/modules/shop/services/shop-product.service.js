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
exports.ShopProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const postgres_error_codes_enum_1 = require("../../../core/database/postgres-error-codes.enum");
const http_exception_1 = require("../../../core/http/http.exception");
const shop_product_entity_1 = require("../entities/shop-product.entity");
const shop_product_status_service_1 = require("../services/shop-product-status.service");
const shop_product_exception_1 = require("../exceptions/shop-product.exception");
let ShopProductService = class ShopProductService extends entity_service_1.EntityService {
    constructor(shopProductRepository, shopProductStatusService) {
        super();
        this.shopProductRepository = shopProductRepository;
        this.shopProductStatusService = shopProductStatusService;
    }
    async existsInTable(id) {
        return await this.shopProductRepository
            .createQueryBuilder('sp')
            .where('sp.id = :id', { id: id })
            .getCount() > 0;
    }
    async createProduct(productData) {
        const product = this.createEntity(this.shopProductRepository.create(productData), ['name']);
        return this.shopProductRepository.save(product)
            .catch((error) => {
            if (error.code === postgres_error_codes_enum_1.PostgresErrorCodes.UNIQUE_VIOLATION) {
                throw new shop_product_exception_1.ShopProductAlreadyExistsException();
            }
            else {
                throw new http_exception_1.InternalServerErrorException();
            }
        });
    }
    async getProduct(id) {
        return this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .where('sp.id = :id', { id: id })
            .getOne();
    }
    async getProducts() {
        return this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .getMany();
    }
    async getProductsByCategory(category) {
        return this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .where(`sc.name = :name`, { name: category.name || '' })
            .orWhere(`sc.id = :id`, { id: category.id || category })
            .getMany();
    }
    async getProductsByStatus(status) {
        return this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .where(`sp.status_id = :statusId`, { statusId: status.id || status })
            .getMany();
    }
    async getProductsByStatusAndCategory(statusId, categoryId) {
        return this.shopProductRepository
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.category', 'sc')
            .leftJoinAndSelect('sp.status', 'sps')
            .where(`sp.category_id = :categoryId`, { categoryId: categoryId })
            .andWhere(`sp.status_id = :statusId`, { statusId: statusId })
            .getMany();
    }
    async updateProduct(id, productData) {
        const newProduct = new shop_product_entity_1.ShopProduct(Object.assign({ id: id }, productData));
        return this.shopProductRepository.save(newProduct);
    }
    async deleteProduct(id) {
        await this.shopProductRepository
            .createQueryBuilder()
            .delete()
            .from(shop_product_entity_1.ShopProduct)
            .where('shop_product.id = :id', { id: id })
            .execute()
            .catch((error) => {
            if (error.code === postgres_error_codes_enum_1.PostgresErrorCodes.FOREIGN_KEY_VIOLATION)
                this.softDeleteProduct(id);
            else
                throw new http_exception_1.InternalServerErrorException();
        });
    }
    async softDeleteProduct(id) {
        let product = await this.getProduct(id);
        if (product.status.status === 'REMOVED')
            return;
        product.name += '_';
        product.status = await this.shopProductStatusService.getStatus('REMOVED');
        await this.shopProductRepository.save(product);
    }
};
ShopProductService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(shop_product_entity_1.ShopProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        shop_product_status_service_1.ShopProductStatusService])
], ShopProductService);
exports.ShopProductService = ShopProductService;
//# sourceMappingURL=shop-product.service.js.map