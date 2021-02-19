import { BadRequestException } from '@nestjs/common';

export class ShopOrderAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Shop order already exists.');
    }
}
