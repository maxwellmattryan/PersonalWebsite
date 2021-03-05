import { BadRequestException } from '@nestjs/common';

export class InvalidCheckoutSessionException extends BadRequestException {
    constructor() {
        super('The checkout session is invalid.');
    }
}

export class InvalidTaxRateException extends BadRequestException {
    constructor() {
        super('The tax rate is invalid.');
    }
}
