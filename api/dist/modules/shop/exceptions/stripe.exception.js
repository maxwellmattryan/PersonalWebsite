"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidStripeSessionException = void 0;
const common_1 = require("@nestjs/common");
class InvalidStripeSessionException extends common_1.BadRequestException {
    constructor() {
        super('The Stripe session is invalid.');
    }
}
exports.InvalidStripeSessionException = InvalidStripeSessionException;
//# sourceMappingURL=stripe.exception.js.map