import { BadRequestException, NotFoundException } from '@nestjs/common';
export declare class ShopCustomerAlreadyExistsException extends BadRequestException {
    constructor();
}
export declare class ShopCustomerHasAlreadyPurchasedProductException extends BadRequestException {
    constructor();
}
export declare class ShopCustomerWasNotFoundException extends NotFoundException {
    constructor();
}
