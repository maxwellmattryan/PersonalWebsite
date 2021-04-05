"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopCustomerWasNotFoundException = exports.ShopCustomerHasAlreadyPurchasedProductException = exports.ShopCustomerAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class ShopCustomerAlreadyExistsException extends common_1.BadRequestException {
    constructor() {
        super('Shop customer already exists.');
    }
}
exports.ShopCustomerAlreadyExistsException = ShopCustomerAlreadyExistsException;
class ShopCustomerHasAlreadyPurchasedProductException extends common_1.BadRequestException {
    constructor() {
        super('It looks like you have already purchased this product. Please visit the FAQ page to see how to download it again.');
    }
}
exports.ShopCustomerHasAlreadyPurchasedProductException = ShopCustomerHasAlreadyPurchasedProductException;
class ShopCustomerWasNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find shop customer.');
    }
}
exports.ShopCustomerWasNotFoundException = ShopCustomerWasNotFoundException;
//# sourceMappingURL=shop-customer.exception.js.map