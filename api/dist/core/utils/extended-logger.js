"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedLogger = void 0;
const common_1 = require("@nestjs/common");
class ExtendedLogger extends common_1.Logger {
    static createResponseLog(message, statusCode) {
        return `[${statusCode}] ${message}`;
    }
    debug(message, ctx = '') {
        super.debug(message, ctx);
    }
    debugResponse(message, statusCode = 200, ctx = '') {
        super.debug(ExtendedLogger.createResponseLog(message, statusCode), ctx);
    }
    info(message, ctx = '') {
        super.log(message, ctx);
    }
    infoResponse(message, statusCode = 200, ctx = '') {
        super.log(ExtendedLogger.createResponseLog(message, statusCode), ctx);
    }
    error(message, trace = '', ctx = '') {
        super.error(message, trace, ctx);
    }
    errorResponse(message, statusCode = 400, trace = '', ctx = '') {
        super.error(ExtendedLogger.createResponseLog(message, statusCode), trace, ctx);
    }
}
exports.ExtendedLogger = ExtendedLogger;
//# sourceMappingURL=extended-logger.js.map