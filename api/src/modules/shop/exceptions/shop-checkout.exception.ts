import { BadRequestException } from '@nestjs/common';

export class InvalidCheckoutSessionException extends BadRequestException {
    constructor() {
        super('The checkout session is invalid.');
    }
}
