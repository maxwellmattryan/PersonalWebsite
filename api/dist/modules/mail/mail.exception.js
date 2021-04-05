"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedToSendOrderConfirmationEmailException = exports.FailedToSendMultiDownloadEmailException = void 0;
const common_1 = require("@nestjs/common");
class FailedToSendMultiDownloadEmailException extends common_1.BadRequestException {
    constructor() {
        super('Failed to send multi download email.');
    }
}
exports.FailedToSendMultiDownloadEmailException = FailedToSendMultiDownloadEmailException;
class FailedToSendOrderConfirmationEmailException extends common_1.BadRequestException {
    constructor() {
        super('Failed to send order confirmation email.');
    }
}
exports.FailedToSendOrderConfirmationEmailException = FailedToSendOrderConfirmationEmailException;
//# sourceMappingURL=mail.exception.js.map