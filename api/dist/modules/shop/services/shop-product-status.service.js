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
exports.ShopProductStatusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const shop_product_status_entity_1 = require("../entities/shop-product-status.entity");
let ShopProductStatusService = class ShopProductStatusService extends entity_service_1.EntityService {
    constructor(shopProductStatusRepository) {
        super();
        this.shopProductStatusRepository = shopProductStatusRepository;
    }
    async getStatus(status) {
        return this.shopProductStatusRepository
            .createQueryBuilder('sps')
            .where('sps.status = :status', { status: status.status || '' })
            .orWhere('sps.id = :id', { id: status.id || status })
            .getOne();
    }
    async getStatuses() {
        return this.shopProductStatusRepository
            .createQueryBuilder('sps')
            .getMany();
    }
};
ShopProductStatusService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(shop_product_status_entity_1.ShopProductStatus)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShopProductStatusService);
exports.ShopProductStatusService = ShopProductStatusService;
//# sourceMappingURL=shop-product-status.service.js.map