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
exports.ShopOrderService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const postgres_error_codes_enum_1 = require("../../../core/database/postgres-error-codes.enum");
const http_exception_1 = require("../../../core/http/http.exception");
const shop_order_entity_1 = require("../entities/shop-order.entity");
const shop_order_exception_1 = require("../exceptions/shop-order.exception");
let ShopOrderService = class ShopOrderService extends entity_service_1.EntityService {
    constructor(shopOrderRepository) {
        super();
        this.shopOrderRepository = shopOrderRepository;
    }
    async hasBeenMadeBefore(customerId, productId) {
        return await this.shopOrderRepository
            .createQueryBuilder('so')
            .where('so.customer_id = :customerId', { customerId: customerId })
            .andWhere('so.product_id = :product', { productId: productId })
            .getCount() > 1;
    }
    async createOrder(orderData) {
        const order = this.createEntity(this.shopOrderRepository.create(orderData), ['customer', 'product']);
        return this.shopOrderRepository.save(order)
            .catch((error) => {
            if (error.code === postgres_error_codes_enum_1.PostgresErrorCodes.UNIQUE_VIOLATION) {
                throw new shop_order_exception_1.ShopOrderAlreadyExistsException();
            }
            else {
                throw new http_exception_1.InternalServerErrorException();
            }
        });
    }
    async getOrder(id) {
        return this.shopOrderRepository
            .createQueryBuilder('so')
            .leftJoinAndSelect('so.product', 'sp')
            .leftJoinAndSelect('so.customer', 'sc')
            .where('so.id = :id', { id: id })
            .getOne();
    }
    async getOrderByCustomerAndProduct(customerId, productId) {
        return this.shopOrderRepository
            .createQueryBuilder('so')
            .leftJoinAndSelect('so.product', 'sp')
            .leftJoinAndSelect('so.customer', 'sc')
            .where('so.customer_id = :customerId', { customerId: customerId })
            .andWhere('so.product_id = :productId', { productId: productId })
            .getOne();
    }
    async getOrdersByCustomer(customerId) {
        return this.shopOrderRepository
            .createQueryBuilder('so')
            .leftJoinAndSelect('so.product', 'sp')
            .leftJoinAndSelect('so.customer', 'sc')
            .where('sc.id = :customerId', { customerId: customerId })
            .getMany();
    }
    async updateOrder(id, orderData, hasSentEmail = true) {
        const newOrder = new shop_order_entity_1.ShopOrder(Object.assign(Object.assign({}, orderData), { has_sent_email: hasSentEmail }));
        return this.shopOrderRepository.save(newOrder);
    }
};
ShopOrderService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(shop_order_entity_1.ShopOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShopOrderService);
exports.ShopOrderService = ShopOrderService;
//# sourceMappingURL=shop-order.service.js.map