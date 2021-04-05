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
exports.ShopOrder = void 0;
const typeorm_1 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const shop_customer_entity_1 = require("./shop-customer.entity");
const shop_product_entity_1 = require("./shop-product.entity");
let ShopOrder = class ShopOrder {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 6 }),
    __metadata("design:type", Object)
], ShopOrder.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => shop_customer_entity_1.ShopCustomer, sc => sc.orders, { nullable: false }),
    __metadata("design:type", shop_customer_entity_1.ShopCustomer)
], ShopOrder.prototype, "customer", void 0);
__decorate([
    typeorm_1.ManyToOne(type => shop_product_entity_1.ShopProduct, sp => sp.orders, { nullable: false }),
    __metadata("design:type", shop_product_entity_1.ShopProduct)
], ShopOrder.prototype, "product", void 0);
__decorate([
    typeorm_1.Column({ type: 'decimal', nullable: false }),
    __metadata("design:type", Number)
], ShopOrder.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column({ type: 'decimal', nullable: false }),
    __metadata("design:type", Number)
], ShopOrder.prototype, "taxed_amount", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: false, default: false }),
    __metadata("design:type", Boolean)
], ShopOrder.prototype, "has_sent_email", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], ShopOrder.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' }),
    __metadata("design:type", Date)
], ShopOrder.prototype, "updated_at", void 0);
ShopOrder = __decorate([
    typeorm_1.Entity('shop_order'),
    __metadata("design:paramtypes", [Object])
], ShopOrder);
exports.ShopOrder = ShopOrder;
//# sourceMappingURL=shop-order.entity.js.map