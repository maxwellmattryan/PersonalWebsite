import { BadRequestException } from '@nestjs/common';

export class InvalidStripeSessionException extends BadRequestException {
    constructor() {
        super('The Stripe session is invalid.');
    }
}
