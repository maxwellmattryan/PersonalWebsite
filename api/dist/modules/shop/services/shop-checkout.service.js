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
exports.ShopCheckoutService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const operators_1 = require("rxjs/operators");
const stripe_1 = require("stripe");
const entity_service_1 = require("../../../core/database/entity.service");
const shop_customer_entity_1 = require("../entities/shop-customer.entity");
const shop_order_entity_1 = require("../entities/shop-order.entity");
const shop_customer_service_1 = require("./shop-customer.service");
const shop_order_service_1 = require("./shop-order.service");
const shop_product_service_1 = require("./shop-product.service");
const shop_product_exception_1 = require("../exceptions/shop-product.exception");
const stripe_exception_1 = require("../exceptions/stripe.exception");
const shop_customer_exception_1 = require("../exceptions/shop-customer.exception");
const shop_checkout_exception_1 = require("../exceptions/shop-checkout.exception");
let ShopCheckoutService = class ShopCheckoutService {
    constructor(configService, httpService, shopCustomerService, shopOrderService, shopProductService) {
        this.configService = configService;
        this.httpService = httpService;
        this.shopCustomerService = shopCustomerService;
        this.shopOrderService = shopOrderService;
        this.shopProductService = shopProductService;
        this.config = null;
        this.stripe = new stripe_1.Stripe(this.configService.get('STRIPE_SK'), this.config);
    }
    async getCheckoutSessionId(productData) {
        const item = await this.createLineItem(productData);
        const { id } = await this.createCheckoutSession(productData.id, [item]);
        return { id };
    }
    createLineItem(productData) {
        const taxRateId = this.configService.get('STRIPE_TAX_RATE_ID');
        return {
            name: productData.name,
            description: productData.preview,
            amount: productData.amount * 100,
            currency: 'usd',
            quantity: 1,
            tax_rates: [taxRateId]
        };
    }
    async createCheckoutSession(productId, lineItems) {
        const baseUrl = this.configService.get('BASE_URL');
        const successUrl = `${baseUrl}/shop/checkout?success=true&sessionId={CHECKOUT_SESSION_ID}&productId=${productId}`;
        const cancelUrl = `${baseUrl}/shop/checkout?success=false`;
        return this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            success_url: successUrl,
            cancel_url: cancelUrl
        });
    }
    async getCheckoutOrder(sessionId, productId) {
        const apiUrl = this.configService.get('STRIPE_API_URL');
        const url = `${apiUrl}/checkout/sessions`;
        const headers = this.getApiHeaders();
        const sessionData = await this.httpService.get(`${url}/${sessionId}`, { headers: headers })
            .pipe(operators_1.map(res => res.data), operators_1.catchError(e => {
            throw new stripe_exception_1.InvalidStripeSessionException();
        })).toPromise();
        const customer = await this.getCustomerForCheckout(sessionData.customer_details.email);
        const product = await this.shopProductService.getProduct(productId);
        const actualAmount = sessionData.amount_total / 100.0;
        const taxedAmount = await this.calculateWithTax(product.amount);
        if (taxedAmount != actualAmount || product.amount <= 0.0) {
            throw new shop_product_exception_1.InvalidShopProductException();
        }
        return this.getOrderForCheckout(customer, product, taxedAmount);
    }
    async getFreeCheckoutOrder(customerEmail, productId) {
        const customer = await this.getCustomerForCheckout(customerEmail);
        const product = await this.shopProductService.getProduct(productId);
        if (product.amount > 0.0)
            throw new shop_product_exception_1.InvalidShopProductException();
        return this.getOrderForCheckout(customer, product, 0.00);
    }
    async getCustomerForCheckout(customerEmail) {
        const exists = await this.shopCustomerService.existsInTable(-1, customerEmail);
        return exists ? this.shopCustomerService.getCustomer(-1, customerEmail) : this.shopCustomerService.createCustomer(new shop_customer_entity_1.ShopCustomer({ email: customerEmail }));
    }
    async getOrderForCheckout(customer, product, taxedAmount) {
        const checkedOrder = await this.shopOrderService.getOrderByCustomerAndProduct(customer.id, product.id);
        const hasOrderBeenMadeBefore = checkedOrder != undefined;
        if (hasOrderBeenMadeBefore)
            throw new shop_customer_exception_1.ShopCustomerHasAlreadyPurchasedProductException();
        else
            return this.shopOrderService.createOrder(new shop_order_entity_1.ShopOrder({
                customer: customer,
                product: product,
                amount: product.amount,
                taxed_amount: taxedAmount
            }));
    }
    async calculateWithTax(amount) {
        if (!this.taxRate)
            await this.setTaxRate();
        const result = Number(amount) * (1.00 + this.taxRate || 1.00);
        return Math.round(result * 100) / 100;
    }
    async setTaxRate() {
        const taxRateId = this.configService.get('STRIPE_TAX_RATE_ID');
        const apiUrl = this.configService.get('STRIPE_API_URL');
        const url = `${apiUrl}/tax_rates/${taxRateId}`;
        const headers = this.getApiHeaders();
        const taxRateData = await this.httpService.get(url, { headers: headers })
            .pipe(operators_1.map(res => res.data), operators_1.catchError(e => {
            throw new shop_checkout_exception_1.InvalidTaxRateException();
        })).toPromise();
        this.taxRate = taxRateData.percentage / 100.00;
    }
    getApiHeaders() {
        const apiKey = this.configService.get('STRIPE_SK');
        return { 'Authorization': `Bearer ${apiKey}` };
    }
};
ShopCheckoutService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        common_1.HttpService,
        shop_customer_service_1.ShopCustomerService,
        shop_order_service_1.ShopOrderService,
        shop_product_service_1.ShopProductService])
], ShopCheckoutService);
exports.ShopCheckoutService = ShopCheckoutService;
//# sourceMappingURL=shop-checkout.service.js.map