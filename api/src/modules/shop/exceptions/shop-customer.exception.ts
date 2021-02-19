import { BadRequestException } from '@nestjs/common';

export class ShopCustomerAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Shop customer already exists.');
    }
}
