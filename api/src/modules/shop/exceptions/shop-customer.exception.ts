import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ShopCustomerAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Shop customer already exists.');
    }
}

export class ShopCustomerHasAlreadyPurchasedProductException extends BadRequestException {
    constructor() {
        super('It looks like you have already purchased this product. Please visit the FAQ page to see how to download it again.');
    }
}

export class ShopCustomerWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find shop customer.');
    }
}
