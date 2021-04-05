"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminWasNotFoundException = exports.AdminAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class AdminAlreadyExistsException extends common_1.BadRequestException {
    constructor() {
        super('Admin already exists.');
    }
}
exports.AdminAlreadyExistsException = AdminAlreadyExistsException;
class AdminWasNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find admin.');
    }
}
exports.AdminWasNotFoundException = AdminWasNotFoundException;
//# sourceMappingURL=admin.exception.js.map