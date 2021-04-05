"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorException = void 0;
const common_1 = require("@nestjs/common");
class InternalServerErrorException extends common_1.HttpException {
    constructor(msg = 'Oops! Something went wrong on the server side.') {
        super(msg, 500);
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
//# sourceMappingURL=http.exception.js.map