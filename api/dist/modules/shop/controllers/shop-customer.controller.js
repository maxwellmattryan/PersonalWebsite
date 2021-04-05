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
exports.ShopCustomerController = void 0;
const common_1 = require("@nestjs/common");
const gcloud_storage_service_1 = require("../../../core/gcloud/gcloud-storage.service");
const jwt_auth_guard_1 = require("../../../core/auth/jwt/jwt-auth.guard");
const mail_service_1 = require("../../mail/mail.service");
const shop_customer_entity_1 = require("../entities/shop-customer.entity");
const shop_customer_service_1 = require("../services/shop-customer.service");
const shop_order_service_1 = require("../services/shop-order.service");
const shop_customer_exception_1 = require("../exceptions/shop-customer.exception");
const shop_order_exception_1 = require("../exceptions/shop-order.exception");
let ShopCustomerController = class ShopCustomerController {
    constructor(gCloudStorageService, mailService, shopCustomerService, shopOrderService) {
        this.gCloudStorageService = gCloudStorageService;
        this.mailService = mailService;
        this.shopCustomerService = shopCustomerService;
        this.shopOrderService = shopOrderService;
    }
    async createCustomer(customerData) {
        return this.shopCustomerService.createCustomer(customerData);
    }
    async helpCustomer(customerData) {
        const email = customerData.email;
        const customer = await this.shopCustomerService.getCustomer(-1, email);
        if (!customer)
            throw new shop_customer_exception_1.ShopCustomerWasNotFoundException();
        const orders = await this.shopOrderService.getOrdersByCustomer(customer.id);
        if (!orders)
            throw new shop_order_exception_1.ShopOrdersWereNotFoundException();
        const productFilenames = orders.map(so => so.product.filename);
        const signedUrls = await this.gCloudStorageService.getSignedUrls('products', productFilenames);
        await this.mailService.sendMultiDownloadEmail(customer, orders, signedUrls);
    }
};
__decorate([
    common_1.Post(''),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shop_customer_entity_1.ShopCustomer]),
    __metadata("design:returntype", Promise)
], ShopCustomerController.prototype, "createCustomer", null);
__decorate([
    common_1.Post('help'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shop_customer_entity_1.ShopCustomer]),
    __metadata("design:returntype", Promise)
], ShopCustomerController.prototype, "helpCustomer", null);
ShopCustomerController = __decorate([
    common_1.Controller('shop/customers'),
    __metadata("design:paramtypes", [gcloud_storage_service_1.GCloudStorageService,
        mail_service_1.MailService,
        shop_customer_service_1.ShopCustomerService,
        shop_order_service_1.ShopOrderService])
], ShopCustomerController);
exports.ShopCustomerController = ShopCustomerController;
//# sourceMappingURL=shop-customer.controller.js.map