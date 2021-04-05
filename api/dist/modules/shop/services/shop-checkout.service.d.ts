import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { Id } from '@api/core/database/entity.service';
import { ShopCustomer } from '../entities/shop-customer.entity';
import { ShopOrder } from '../entities/shop-order.entity';
import { ShopProduct } from '../entities/shop-product.entity';
import { ShopCustomerService } from './shop-customer.service';
import { ShopOrderService } from './shop-order.service';
import { ShopProductService } from './shop-product.service';
export declare type ApiHeaders = {
    'Authorization': string;
};
export declare type ShopLineItem = Stripe.Checkout.SessionCreateParams.LineItem;
export declare class ShopCheckoutService {
    private readonly configService;
    private readonly httpService;
    private readonly shopCustomerService;
    private readonly shopOrderService;
    private readonly shopProductService;
    private config;
    private stripe;
    private taxRate;
    constructor(configService: ConfigService, httpService: HttpService, shopCustomerService: ShopCustomerService, shopOrderService: ShopOrderService, shopProductService: ShopProductService);
    getCheckoutSessionId(productData: ShopProduct): Promise<{
        id: string;
    }>;
    private createLineItem;
    private createCheckoutSession;
    getCheckoutOrder(sessionId: string, productId: Id): Promise<ShopOrder>;
    getFreeCheckoutOrder(customerEmail: string, productId: Id): Promise<ShopOrder>;
    private getCustomerForCheckout;
    getOrderForCheckout(customer: ShopCustomer, product: ShopProduct, taxedAmount: number): Promise<ShopOrder>;
    private calculateWithTax;
    private setTaxRate;
    private getApiHeaders;
}
