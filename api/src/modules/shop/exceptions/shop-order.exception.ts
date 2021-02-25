import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ShopOrderAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Shop order already exists.');
    }
}

export class ShopOrdersWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find shop orders.');
    }
}
