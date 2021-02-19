import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Stripe } from 'stripe';

@Injectable()
export class ShopPaymentService {
    private config: Stripe.StripeConfig = null;
    private stripe: Stripe = new Stripe(this.configService.get('STRIPE_SK'), this.config);

    constructor(
        private readonly configService: ConfigService
    ) { }
}
