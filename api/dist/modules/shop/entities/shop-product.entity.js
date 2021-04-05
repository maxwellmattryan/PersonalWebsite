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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopProduct = void 0;
const typeorm_1 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const shop_category_entity_1 = require("../entities/shop-category.entity");
const shop_product_status_entity_1 = require("../entities/shop-product-status.entity");
const shop_order_entity_1 = require("./shop-order.entity");
let ShopProduct = class ShopProduct {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 6 }),
    __metadata("design:type", Object)
], ShopProduct.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(type => shop_order_entity_1.ShopOrder, so => so.product),
    __metadata("design:type", Array)
], ShopProduct.prototype, "orders", void 0);
__decorate([
    typeorm_1.ManyToOne(type => shop_product_status_entity_1.ShopProductStatus, sps => sps.products, { nullable: false }),
    __metadata("design:type", shop_product_status_entity_1.ShopProductStatus)
], ShopProduct.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToOne(type => shop_category_entity_1.ShopCategory, sc => sc.products, { nullable: false }),
    __metadata("design:type", shop_category_entity_1.ShopCategory)
], ShopProduct.prototype, "category", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], ShopProduct.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], ShopProduct.prototype, "filename", void 0);
__decorate([
    typeorm_1.Column({ type: 'decimal', nullable: false }),
    __metadata("design:type", Number)
], ShopProduct.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], ShopProduct.prototype, "preview", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], ShopProduct.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], ShopProduct.prototype, "image_url", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], ShopProduct.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' }),
    __metadata("design:type", Date)
], ShopProduct.prototype, "updated_at", void 0);
ShopProduct = __decorate([
    typeorm_1.Entity('shop_product'),
    __metadata("design:paramtypes", [Object])
], ShopProduct);
exports.ShopProduct = ShopProduct;
//# sourceMappingURL=shop-product.entity.js.map