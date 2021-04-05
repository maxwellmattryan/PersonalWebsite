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
exports.ShopCustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const postgres_error_codes_enum_1 = require("../../../core/database/postgres-error-codes.enum");
const http_exception_1 = require("../../../core/http/http.exception");
const shop_customer_entity_1 = require("../entities/shop-customer.entity");
const shop_customer_exception_1 = require("../exceptions/shop-customer.exception");
let ShopCustomerService = class ShopCustomerService extends entity_service_1.EntityService {
    constructor(shopCustomerRepository) {
        super();
        this.shopCustomerRepository = shopCustomerRepository;
    }
    async existsInTable(id = -1, email = '') {
        return await this.shopCustomerRepository
            .createQueryBuilder('sc')
            .where('sc.id = :id', { id: id })
            .orWhere('sc.email = :email', { email: email })
            .getCount() > 0;
    }
    async createCustomer(customerData) {
        const customer = this.createEntity(this.shopCustomerRepository.create(customerData), ['email']);
        return this.shopCustomerRepository.save(customer)
            .catch((error) => {
            if (error.code === postgres_error_codes_enum_1.PostgresErrorCodes.UNIQUE_VIOLATION)
                throw new shop_customer_exception_1.ShopCustomerAlreadyExistsException();
            else
                throw new http_exception_1.InternalServerErrorException();
        });
    }
    async getCustomer(id = -1, email = '') {
        return this.shopCustomerRepository
            .createQueryBuilder('sc')
            .where('sc.id = :id', { id: id })
            .orWhere('sc.email = :email', { email: email })
            .getOne();
    }
};
ShopCustomerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(shop_customer_entity_1.ShopCustomer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShopCustomerService);
exports.ShopCustomerService = ShopCustomerService;
//# sourceMappingURL=shop-customer.service.js.map