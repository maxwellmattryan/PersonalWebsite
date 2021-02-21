import { BadRequestException } from '@nestjs/common';

export class InvalidStripeSessionIdException extends BadRequestException {
    constructor() {
        super('The Stripe session ID is invalid.');
    }
}
