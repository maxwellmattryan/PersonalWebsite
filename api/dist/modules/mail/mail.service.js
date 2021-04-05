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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const shop_customer_entity_1 = require("../shop/entities/shop-customer.entity");
const shop_order_entity_1 = require("../shop/entities/shop-order.entity");
let MailService = class MailService {
    constructor(mailQueue) {
        this.mailQueue = mailQueue;
    }
    async sendMultiDownloadEmail(customer, orders, signedUrls) {
        await this.mailQueue.add('multi-download', { customer: customer, orders: orders, signedUrls: signedUrls })
            .catch((error) => { console.log(error); });
    }
    async sendConfirmationEmail(order, signedUrl) {
        await this.mailQueue.add('confirmation', { order: order, signedUrl: signedUrl })
            .catch((error) => { console.log(error); });
    }
};
MailService = __decorate([
    common_1.Injectable(),
    __param(0, bull_1.InjectQueue(process.env.REDIS_NAME)),
    __metadata("design:paramtypes", [Object])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map