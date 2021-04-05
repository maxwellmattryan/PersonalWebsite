"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopCategoriesWereNotFoundException = exports.ShopCategoryWasNotFoundException = exports.ShopCategoryCouldNotBeDeletedException = exports.ShopCategoryCouldNotBeUpdatedException = exports.ShopCategoryAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class ShopCategoryAlreadyExistsException extends common_1.BadRequestException {
    constructor() {
        super('Shop category already exists.');
    }
}
exports.ShopCategoryAlreadyExistsException = ShopCategoryAlreadyExistsException;
class ShopCategoryCouldNotBeUpdatedException extends common_1.BadRequestException {
    constructor() {
        super('Shop category could not be updated.');
    }
}
exports.ShopCategoryCouldNotBeUpdatedException = ShopCategoryCouldNotBeUpdatedException;
class ShopCategoryCouldNotBeDeletedException extends common_1.BadRequestException {
    constructor() {
        super('Shop category could not be deleted (number of corresponding products must equal zero).');
    }
}
exports.ShopCategoryCouldNotBeDeletedException = ShopCategoryCouldNotBeDeletedException;
class ShopCategoryWasNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find shop category.');
    }
}
exports.ShopCategoryWasNotFoundException = ShopCategoryWasNotFoundException;
class ShopCategoriesWereNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find shop categories.');
    }
}
exports.ShopCategoriesWereNotFoundException = ShopCategoriesWereNotFoundException;
//# sourceMappingURL=shop-category.exception.js.map