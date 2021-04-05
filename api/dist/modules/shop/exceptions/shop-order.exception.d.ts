import { BadRequestException, NotFoundException } from '@nestjs/common';
export declare class ShopOrderAlreadyExistsException extends BadRequestException {
    constructor();
}
export declare class ShopOrdersWereNotFoundException extends NotFoundException {
    constructor();
}
