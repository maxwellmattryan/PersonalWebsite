"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const extended_logger_1 = require("../utils/extended-logger");
class HttpExceptionFilter extends core_1.BaseExceptionFilter {
    constructor() {
        super(...arguments);
        this.logger = new extended_logger_1.ExtendedLogger('HttpExceptionFilter');
    }
    catch(exception, host) {
        const isHttpError = exception instanceof common_1.HttpException;
        if (!isHttpError)
            this.handleException(exception);
        else
            this.handleHttpException(exception);
        super.catch(exception, host);
    }
    handleException(exception) {
        this.logger.error(String(exception));
    }
    handleHttpException(exception) {
        const { statusCode, message, error } = exception.response;
        this.logger.error(message);
    }
}
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map