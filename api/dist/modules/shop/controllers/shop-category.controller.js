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
exports.ShopCategoryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../core/auth/jwt/jwt-auth.guard");
const entity_service_1 = require("../../../core/database/entity.service");
const shop_category_entity_1 = require("../entities/shop-category.entity");
const shop_category_service_1 = require("../services/shop-category.service");
const shop_category_exception_1 = require("../exceptions/shop-category.exception");
let ShopCategoryController = class ShopCategoryController {
    constructor(shopCategoryService) {
        this.shopCategoryService = shopCategoryService;
    }
    async getCategories() {
        const categories = await this.shopCategoryService.getCategories();
        if (categories.length === 0)
            throw new shop_category_exception_1.ShopCategoriesWereNotFoundException();
        return categories;
    }
    async createCategory(categoryData) {
        return this.shopCategoryService.createCategory(categoryData);
    }
    async getCategory(id) {
        const category = await this.shopCategoryService.getCategory(id);
        if (!category)
            throw new shop_category_exception_1.ShopCategoryWasNotFoundException();
        return category;
    }
    async updateCategory(id, categoryData) {
        const category = await this.shopCategoryService.updateCategory(id, categoryData);
        if (!category)
            throw new shop_category_exception_1.ShopCategoryCouldNotBeUpdatedException();
        return category;
    }
    async deleteCategory(id) {
        if (!(await this.shopCategoryService.existsInTable(id)))
            throw new shop_category_exception_1.ShopCategoryWasNotFoundException();
        await this.shopCategoryService.deleteCategory(id);
    }
};
__decorate([
    common_1.Get(''),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShopCategoryController.prototype, "getCategories", null);
__decorate([
    common_1.Post(''),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shop_category_entity_1.ShopCategory]),
    __metadata("design:returntype", Promise)
], ShopCategoryController.prototype, "createCategory", null);
__decorate([
    common_1.Get(':id'),
    common_1.HttpCode(200),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopCategoryController.prototype, "getCategory", null);
__decorate([
    common_1.Put(':id'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, shop_category_entity_1.ShopCategory]),
    __metadata("design:returntype", Promise)
], ShopCategoryController.prototype, "updateCategory", null);
__decorate([
    common_1.Delete(':id'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopCategoryController.prototype, "deleteCategory", null);
ShopCategoryController = __decorate([
    common_1.Controller('shop/categories'),
    __metadata("design:paramtypes", [shop_category_service_1.ShopCategoryService])
], ShopCategoryController);
exports.ShopCategoryController = ShopCategoryController;
//# sourceMappingURL=shop-category.controller.js.map