"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEntityPropertyException = void 0;
const common_1 = require("@nestjs/common");
class InvalidEntityPropertyException extends common_1.BadRequestException {
    constructor() {
        super('The specified property does not exist on this entity type.');
    }
}
exports.InvalidEntityPropertyException = InvalidEntityPropertyException;
//# sourceMappingURL=entity.exception.js.map