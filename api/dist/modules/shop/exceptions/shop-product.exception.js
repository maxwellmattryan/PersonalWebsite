"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopProductsWereNotFoundException = exports.ShopProductWasNotFoundException = exports.ShopProductCouldNotBeUpdatedException = exports.ShopProductAlreadyExistsException = exports.InvalidShopProductException = void 0;
const common_1 = require("@nestjs/common");
class InvalidShopProductException extends common_1.BadRequestException {
    constructor() {
        super('Shop product is invalid.');
    }
}
exports.InvalidShopProductException = InvalidShopProductException;
class ShopProductAlreadyExistsException extends common_1.BadRequestException {
    constructor() {
        super('Shop product already exists.');
    }
}
exports.ShopProductAlreadyExistsException = ShopProductAlreadyExistsException;
class ShopProductCouldNotBeUpdatedException extends common_1.BadRequestException {
    constructor() {
        super('Shop product could not be updated.');
    }
}
exports.ShopProductCouldNotBeUpdatedException = ShopProductCouldNotBeUpdatedException;
class ShopProductWasNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find shop product.');
    }
}
exports.ShopProductWasNotFoundException = ShopProductWasNotFoundException;
class ShopProductsWereNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find shop products.');
    }
}
exports.ShopProductsWereNotFoundException = ShopProductsWereNotFoundException;
//# sourceMappingURL=shop-product.exception.js.map