import { NotFoundException } from '@nestjs/common';

export class ShopCategoryWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find shop category.');
    }
}

export class ShopCategoriesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find shop categories.');
    }
}