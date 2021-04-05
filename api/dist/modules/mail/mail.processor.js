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
exports.MailProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const mailer_1 = require("@nestjs-modules/mailer");
const class_transformer_1 = require("class-transformer");
const extended_logger_1 = require("../../core/utils/extended-logger");
const utils_service_1 = require("../../core/utils/utils.service");
const shop_customer_entity_1 = require("../shop/entities/shop-customer.entity");
const shop_order_entity_1 = require("../shop/entities/shop-order.entity");
const mail_exception_1 = require("./mail.exception");
let MailProcessor = class MailProcessor {
    constructor(mailerService, utilsService) {
        this.mailerService = mailerService;
        this.utilsService = utilsService;
        this.logger = new extended_logger_1.ExtendedLogger(this.constructor.name);
    }
    onActive(job) {
        this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
    }
    onCompleted(job, result) {
        this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`);
    }
    onFailed(job, error) {
        this.logger.debug(`Failed job ${job.id} of type ${job.name}. Error: ${error.message}`, error.stack);
    }
    async sendMultiDownloadEmail(job) {
        await this.mailerService.sendMail({
            template: 'multi-download',
            context: Object.assign(Object.assign({}, class_transformer_1.plainToClass(shop_customer_entity_1.ShopCustomer, job.data.customer)), { orders: this.utilsService.zip(job.data.orders, job.data.signedUrls) }),
            subject: `Download URL(s) | mattmaxwell.dev`,
            to: job.data.customer.email
        })
            .then((res) => {
            this.logger.log(`Sending multi download email to ${job.data.customer.email}`);
            return res;
        })
            .catch((error) => {
            this.logger.error(`Failed to send multi download email to ${job.data.customer.email}`, error.stack);
            throw new mail_exception_1.FailedToSendMultiDownloadEmailException();
        });
    }
    async sendOrderConfirmationEmail(job) {
        const isFreeOrder = job.data.order.amount <= 0.0;
        await this.mailerService.sendMail({
            template: `${isFreeOrder ? 'download' : 'order'}-confirmation`,
            context: Object.assign(Object.assign({}, class_transformer_1.plainToClass(shop_order_entity_1.ShopOrder, job.data.order)), { signedUrl: job.data.signedUrl }),
            subject: `${job.data.order.product.name} | ${isFreeOrder ? 'Download' : 'Order'} Confirmation | mattmaxwell.dev`,
            to: job.data.order.customer.email
        })
            .then((res) => {
            this.logger.log(`Sent order download email to ${job.data.order.customer.email}`);
            return res;
        })
            .catch((error) => {
            this.logger.error(`Failed to send order confirmation email to ${job.data.order.customer.email}`, error.stack);
            throw new mail_exception_1.FailedToSendOrderConfirmationEmailException();
        });
    }
};
__decorate([
    bull_1.OnQueueActive(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onActive", null);
__decorate([
    bull_1.OnQueueCompleted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onCompleted", null);
__decorate([
    bull_1.OnQueueFailed(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onFailed", null);
__decorate([
    bull_1.Process('multi-download'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "sendMultiDownloadEmail", null);
__decorate([
    bull_1.Process('confirmation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "sendOrderConfirmationEmail", null);
MailProcessor = __decorate([
    bull_1.Processor(process.env.REDIS_NAME),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        utils_service_1.UtilsService])
], MailProcessor);
exports.MailProcessor = MailProcessor;
//# sourceMappingURL=mail.processor.js.map