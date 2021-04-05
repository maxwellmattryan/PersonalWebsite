import { BadRequestException, NotFoundException } from '@nestjs/common';
export declare class InvalidShopProductException extends BadRequestException {
    constructor();
}
export declare class ShopProductAlreadyExistsException extends BadRequestException {
    constructor();
}
export declare class ShopProductCouldNotBeUpdatedException extends BadRequestException {
    constructor();
}
export declare class ShopProductWasNotFoundException extends NotFoundException {
    constructor();
}
export declare class ShopProductsWereNotFoundException extends NotFoundException {
    constructor();
}
