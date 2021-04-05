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
exports.ShopProductStatuses = exports.ShopProductStatus = void 0;
const typeorm_1 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const shop_product_entity_1 = require("../entities/shop-product.entity");
let ShopProductStatus = class ShopProductStatus {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 6 }),
    __metadata("design:type", Object)
], ShopProductStatus.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(type => shop_product_entity_1.ShopProduct, sp => sp.status),
    __metadata("design:type", Array)
], ShopProductStatus.prototype, "products", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], ShopProductStatus.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], ShopProductStatus.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' }),
    __metadata("design:type", Date)
], ShopProductStatus.prototype, "updated_at", void 0);
ShopProductStatus = __decorate([
    typeorm_1.Entity('shop_product_status'),
    __metadata("design:paramtypes", [Object])
], ShopProductStatus);
exports.ShopProductStatus = ShopProductStatus;
var ShopProductStatuses;
(function (ShopProductStatuses) {
    ShopProductStatuses["AVAILABLE"] = "AVAILABLE";
    ShopProductStatuses["UNAVAILABLE"] = "UNAVAILABLE";
    ShopProductStatuses["DISCONTINUED"] = "DISCONTINUED";
    ShopProductStatuses["REMOVED"] = "REMOVED";
})(ShopProductStatuses = exports.ShopProductStatuses || (exports.ShopProductStatuses = {}));
//# sourceMappingURL=shop-product-status.entity.js.map