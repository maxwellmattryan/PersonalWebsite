"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopOrdersWereNotFoundException = exports.ShopOrderAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class ShopOrderAlreadyExistsException extends common_1.BadRequestException {
    constructor() {
        super('Shop order already exists.');
    }
}
exports.ShopOrderAlreadyExistsException = ShopOrderAlreadyExistsException;
class ShopOrdersWereNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find shop orders.');
    }
}
exports.ShopOrdersWereNotFoundException = ShopOrdersWereNotFoundException;
//# sourceMappingURL=shop-order.exception.js.map