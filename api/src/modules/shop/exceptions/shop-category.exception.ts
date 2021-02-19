import { NotFoundException } from '@nestjs/common';

export class ShopCategoriesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find shop categories.');
    }
}