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
exports.ShopCustomer = void 0;
const typeorm_1 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const shop_order_entity_1 = require("./shop-order.entity");
let ShopCustomer = class ShopCustomer {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 6 }),
    __metadata("design:type", Object)
], ShopCustomer.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(type => shop_order_entity_1.ShopOrder, so => so.customer),
    __metadata("design:type", Array)
], ShopCustomer.prototype, "orders", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false, unique: true }),
    typeorm_1.Index('email_idx'),
    __metadata("design:type", String)
], ShopCustomer.prototype, "email", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], ShopCustomer.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' }),
    __metadata("design:type", Date)
], ShopCustomer.prototype, "updated_at", void 0);
ShopCustomer = __decorate([
    typeorm_1.Entity('shop_customer'),
    __metadata("design:paramtypes", [Object])
], ShopCustomer);
exports.ShopCustomer = ShopCustomer;
//# sourceMappingURL=shop-customer.entity.js.map