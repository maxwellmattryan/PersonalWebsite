import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Stripe } from 'stripe';

import { ShopProduct } from '../entities/shop-product.entity';

export type ShopLineItem = Stripe.Checkout.SessionCreateParams.LineItem;

@Injectable()
export class ShopCheckoutService {
    private config: Stripe.StripeConfig = null;
    private stripe: Stripe = new Stripe(this.configService.get('STRIPE_SK'), this.config);

    constructor(
        private readonly configService: ConfigService
    ) { }

    public async getCheckoutSessionId(productData: ShopProduct): Promise<{id: string}> {
        const item: ShopLineItem = await this.createLineItem(productData);
        const { id } = await this.createCheckoutSession([item]);

        return { id };
    }

    private createLineItem(productData: ShopProduct): ShopLineItem {
        return {
            // TODO: id = stripe_product_id
            // TODO: price_id = stripe_price_id
            name: productData.name,
            description: productData.preview,
            amount: productData.amount * 100,
            currency: 'usd',
            quantity: 1
        };
    }

    private async createCheckoutSession(lineItems: ShopLineItem[]): Promise<Stripe.Checkout.Session> {
        const baseUrl: string = this.configService.get('BASE_URL');
        const successUrl: string = `${baseUrl}/shop/checkout?success=true&sessionId={CHECKOUT_SESSION_ID}`;
        const cancelUrl: string = `${baseUrl}/shop/checkout?success=false`

        return this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            success_url: successUrl,
            cancel_url: cancelUrl
        });
    }
}
