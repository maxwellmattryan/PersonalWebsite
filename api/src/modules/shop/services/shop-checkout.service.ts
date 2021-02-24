import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs/operators';

import { Stripe } from 'stripe';

import { ShopCustomer } from '../entities/shop-customer.entity';
import { ShopOrder } from '../entities/shop-order.entity';
import { ShopProduct } from '../entities/shop-product.entity';

import { ShopCustomerService } from './shop-customer.service';
import { ShopOrderService } from './shop-order.service';
import { ShopProductService } from './shop-product.service';

import { InvalidShopProductException } from '../exceptions/shop-product.exception';
import { InvalidStripeSessionException } from '../exceptions/stripe.exception';

export type ShopLineItem = Stripe.Checkout.SessionCreateParams.LineItem;

@Injectable()
export class ShopCheckoutService {
    private config: Stripe.StripeConfig = null;
    private stripe: Stripe = new Stripe(this.configService.get('STRIPE_SK'), this.config);

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly shopCustomerService: ShopCustomerService,
        private readonly shopOrderService: ShopOrderService,
        private readonly shopProductService: ShopProductService
    ) { }

    public async getCheckoutSessionId(productData: ShopProduct): Promise<{id: string}> {
        const item: ShopLineItem = await this.createLineItem(productData);
        const { id } = await this.createCheckoutSession(productData.id, [item]);

        return { id };
    }

    private createLineItem(productData: ShopProduct): ShopLineItem {
        return {
            name: productData.name,
            description: productData.preview,
            amount: productData.amount * 100,
            currency: 'usd',
            quantity: 1
        };
    }

    private async createCheckoutSession(productId: number, lineItems: ShopLineItem[]): Promise<Stripe.Checkout.Session> {
        const baseUrl: string = this.configService.get('BASE_URL');
        const successUrl: string = `${baseUrl}/shop/checkout?success=true&sessionId={CHECKOUT_SESSION_ID}&productId=${productId}`;
        const cancelUrl: string = `${baseUrl}/shop/checkout?success=false`

        return this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            success_url: successUrl,
            cancel_url: cancelUrl
        });
    }

    public async getCheckoutOrder(sessionId: string, productId: number): Promise<ShopOrder> {
        const apiUrl = this.configService.get('STRIPE_API_URL');
        const url: string = `${apiUrl}/checkout/sessions`;

        const apiKey = this.configService.get('STRIPE_API_KEY');
        const headers = { 'Authorization': `Bearer ${apiKey}` };

        const sessionData = await this.httpService.get(`${url}/${sessionId}`, { headers: headers })
            .pipe(map(res => res.data), catchError(e => {
                throw new InvalidStripeSessionException();
            })).toPromise();

        const customer = await this.getCustomerForCheckout((sessionData as any).customer_details.email);
        const product = await this.shopProductService.getProduct(productId);

        if(product.amount != (sessionData as any).amount_total / 100.0 || product.amount <= 0.0)
            throw new InvalidShopProductException();

        return await this.getOrderForCheckout(customer, product);
    }

    public async getFreeCheckoutOrder(customerEmail: string, productId: number): Promise<ShopOrder> {
        const customer = await this.getCustomerForCheckout(customerEmail);
        const product = await this.shopProductService.getProduct(productId);
        if(product.amount > 0.0) throw new InvalidShopProductException();

        return await this.getOrderForCheckout(customer, product);
    }

    private async getCustomerForCheckout(customerEmail: string): Promise<ShopCustomer> {
        const exists: boolean = await this.shopCustomerService.existsInTable(-1, customerEmail);
        return await (exists ? this.shopCustomerService.getCustomer(-1, customerEmail) : this.shopCustomerService.createCustomer(new ShopCustomer({ email: customerEmail })));
    }

    public async getOrderForCheckout(customer: ShopCustomer, product: ShopProduct): Promise<ShopOrder> {
        const checkedOrder: ShopOrder = await this.shopOrderService.getOrderByCustomerAndProduct(customer.id, product.id);
        const hasOrderBeenMadeBefore: boolean = checkedOrder != undefined;
        if(hasOrderBeenMadeBefore) {
            return checkedOrder;
        }
        else {
            return await this.shopOrderService.createOrder(new ShopOrder({
                customer: customer,
                product: product,
                amount: product.amount
            }));
        }
    }
}
