import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ShopCustomerAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Shop customer already exists.');
    }
}

export class ShopCustomerWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find shop customer.');
    }
}
