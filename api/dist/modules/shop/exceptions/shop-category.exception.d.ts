import { BadRequestException, NotFoundException } from '@nestjs/common';
export declare class ShopCategoryAlreadyExistsException extends BadRequestException {
    constructor();
}
export declare class ShopCategoryCouldNotBeUpdatedException extends BadRequestException {
    constructor();
}
export declare class ShopCategoryCouldNotBeDeletedException extends BadRequestException {
    constructor();
}
export declare class ShopCategoryWasNotFoundException extends NotFoundException {
    constructor();
}
export declare class ShopCategoriesWereNotFoundException extends NotFoundException {
    constructor();
}
