import { NotFoundException } from '@nestjs/common';

export class ShopProductStatusesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find shop product statuses.');
    }
}
