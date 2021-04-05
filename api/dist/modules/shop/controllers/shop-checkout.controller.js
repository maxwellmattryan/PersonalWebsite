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
exports.ShopCheckoutController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const gcloud_storage_service_1 = require("../../../core/gcloud/gcloud-storage.service");
const entity_service_1 = require("../../../core/database/entity.service");
const mail_service_1 = require("../../mail/mail.service");
const shop_customer_entity_1 = require("../entities/shop-customer.entity");
const shop_product_entity_1 = require("../entities/shop-product.entity");
const shop_checkout_service_1 = require("../services/shop-checkout.service");
const shop_order_service_1 = require("../services/shop-order.service");
const shop_checkout_exception_1 = require("../exceptions/shop-checkout.exception");
let ShopCheckoutController = class ShopCheckoutController {
    constructor(configService, gCloudStorageService, httpService, mailService, shopCheckoutService, shopOrderService) {
        this.configService = configService;
        this.gCloudStorageService = gCloudStorageService;
        this.httpService = httpService;
        this.mailService = mailService;
        this.shopCheckoutService = shopCheckoutService;
        this.shopOrderService = shopOrderService;
    }
    async createCheckoutSession(productData) {
        return this.shopCheckoutService.getCheckoutSessionId(productData);
    }
    async completeCheckoutSession(isFreeProduct, productId, sessionId, customerData) {
        if (!(productId && (sessionId || isFreeProduct)))
            throw new shop_checkout_exception_1.InvalidCheckoutSessionException();
        let order = await (isFreeProduct ?
            this.shopCheckoutService.getFreeCheckoutOrder(customerData.email, productId)
            : this.shopCheckoutService.getCheckoutOrder(sessionId, productId));
        if (!order.has_sent_email) {
            const signedUrl = await this.gCloudStorageService.getSignedUrl('products', order.product.filename);
            await this.mailService.sendConfirmationEmail(order, signedUrl);
            order = await this.shopOrderService.updateOrder(order.id, order);
        }
        return order;
    }
};
__decorate([
    common_1.Post('init'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shop_product_entity_1.ShopProduct]),
    __metadata("design:returntype", Promise)
], ShopCheckoutController.prototype, "createCheckoutSession", null);
__decorate([
    common_1.Post('complete'),
    common_1.HttpCode(200),
    __param(0, common_1.Query('isFreeProduct')),
    __param(1, common_1.Query('productId')),
    __param(2, common_1.Query('sessionId')),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Object, String, shop_customer_entity_1.ShopCustomer]),
    __metadata("design:returntype", Promise)
], ShopCheckoutController.prototype, "completeCheckoutSession", null);
ShopCheckoutController = __decorate([
    common_1.Controller('shop/checkout'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        gcloud_storage_service_1.GCloudStorageService,
        common_1.HttpService,
        mail_service_1.MailService,
        shop_checkout_service_1.ShopCheckoutService,
        shop_order_service_1.ShopOrderService])
], ShopCheckoutController);
exports.ShopCheckoutController = ShopCheckoutController;
//# sourceMappingURL=shop-checkout.controller.js.map