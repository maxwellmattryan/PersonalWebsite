"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAllowedToRegisterException = exports.WrongCredentialsWereProvidedException = void 0;
const common_1 = require("@nestjs/common");
class WrongCredentialsWereProvidedException extends common_1.BadRequestException {
    constructor() {
        super('The wrong credentials were provided.');
    }
}
exports.WrongCredentialsWereProvidedException = WrongCredentialsWereProvidedException;
class NotAllowedToRegisterException extends common_1.BadRequestException {
    constructor() {
        super('Not allowed to register.');
    }
}
exports.NotAllowedToRegisterException = NotAllowedToRegisterException;
//# sourceMappingURL=auth.exception.js.map