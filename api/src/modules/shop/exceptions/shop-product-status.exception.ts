import { NotFoundException } from '@nestjs/common';

export class ShopProductStatusesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Shop product statuses were not found.');
    }
}
