"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTaxRateException = exports.InvalidCheckoutSessionException = void 0;
const common_1 = require("@nestjs/common");
class InvalidCheckoutSessionException extends common_1.BadRequestException {
    constructor() {
        super('The checkout session is invalid.');
    }
}
exports.InvalidCheckoutSessionException = InvalidCheckoutSessionException;
class InvalidTaxRateException extends common_1.BadRequestException {
    constructor() {
        super('The tax rate is invalid.');
    }
}
exports.InvalidTaxRateException = InvalidTaxRateException;
//# sourceMappingURL=shop-checkout.exception.js.map