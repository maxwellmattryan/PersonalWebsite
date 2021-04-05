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
exports.ShopProductController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../core/auth/jwt/jwt-auth.guard");
const entity_service_1 = require("../../../core/database/entity.service");
const shop_product_entity_1 = require("../entities/shop-product.entity");
const shop_product_service_1 = require("../services/shop-product.service");
const shop_product_exception_1 = require("../exceptions/shop-product.exception");
let ShopProductController = class ShopProductController {
    constructor(shopProductService) {
        this.shopProductService = shopProductService;
    }
    async getProducts(statusId, categoryId) {
        let products;
        if (statusId && statusId != -1) {
            if (categoryId && categoryId != -1) {
                products = await this.shopProductService.getProductsByStatusAndCategory(statusId, categoryId);
            }
            else {
                products = await this.shopProductService.getProductsByStatus(statusId);
            }
        }
        else {
            if (categoryId && categoryId != -1) {
                products = await this.shopProductService.getProductsByCategory(categoryId);
            }
            else {
                products = await this.shopProductService.getProducts();
            }
        }
        if (products.length === 0)
            throw new shop_product_exception_1.ShopProductsWereNotFoundException();
        return products;
    }
    async createProduct(productData) {
        return this.shopProductService.createProduct(productData);
    }
    async getProduct(id) {
        const product = await this.shopProductService.getProduct(id);
        if (!product)
            throw new shop_product_exception_1.ShopProductWasNotFoundException();
        return product;
    }
    async updateProduct(id, productData) {
        const product = await this.shopProductService.updateProduct(id, productData);
        if (!product)
            throw new shop_product_exception_1.ShopProductCouldNotBeUpdatedException();
        return product;
    }
    async deleteProduct(id, doSoftDelete) {
        if (!(await this.shopProductService.existsInTable(id)))
            throw new shop_product_exception_1.ShopProductWasNotFoundException();
        if (doSoftDelete)
            await this.shopProductService.softDeleteProduct(id);
        else
            await this.shopProductService.deleteProduct(id);
    }
};
__decorate([
    common_1.Get(''),
    common_1.HttpCode(200),
    __param(0, common_1.Query('statusId')),
    __param(1, common_1.Query('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShopProductController.prototype, "getProducts", null);
__decorate([
    common_1.Post(''),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shop_product_entity_1.ShopProduct]),
    __metadata("design:returntype", Promise)
], ShopProductController.prototype, "createProduct", null);
__decorate([
    common_1.Get(':id'),
    common_1.HttpCode(200),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopProductController.prototype, "getProduct", null);
__decorate([
    common_1.Put(':id'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, shop_product_entity_1.ShopProduct]),
    __metadata("design:returntype", Promise)
], ShopProductController.prototype, "updateProduct", null);
__decorate([
    common_1.Delete(':id'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Query('doSoftDelete')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", Promise)
], ShopProductController.prototype, "deleteProduct", null);
ShopProductController = __decorate([
    common_1.Controller('shop/products'),
    __metadata("design:paramtypes", [shop_product_service_1.ShopProductService])
], ShopProductController);
exports.ShopProductController = ShopProductController;
//# sourceMappingURL=shop-product.controller.js.map