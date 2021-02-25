import { BadRequestException, NotFoundException } from '@nestjs/common';

export class InvalidShopProductException extends BadRequestException {
    constructor() {
        super('Shop product is invalid.');
    }
}

export class ShopProductAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Shop product already exists.');
    }
}
export class ShopProductCouldNotBeUpdatedException extends BadRequestException {
    constructor() {
        super('Shop product could not be updated.');
    }
}

export class ShopProductWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find shop product.');
    }

}

export class ShopProductsWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find shop products.');
    }
}
