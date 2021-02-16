import { NotFoundException } from '@nestjs/common';

export class ShopProductsWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find shop products.');
    }
}
