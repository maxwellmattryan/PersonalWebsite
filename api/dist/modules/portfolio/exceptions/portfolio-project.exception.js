"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioProjectsWereNotFoundException = exports.PortfolioProjectWasNotFoundException = exports.PortfolioProjectCouldNotBeUpdatedException = exports.PortfolioProjectAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class PortfolioProjectAlreadyExistsException extends common_1.BadRequestException {
    constructor() {
        super('Portfolio project already exists.');
    }
}
exports.PortfolioProjectAlreadyExistsException = PortfolioProjectAlreadyExistsException;
class PortfolioProjectCouldNotBeUpdatedException extends common_1.BadRequestException {
    constructor() {
        super('Portfolio project could not be updated.');
    }
}
exports.PortfolioProjectCouldNotBeUpdatedException = PortfolioProjectCouldNotBeUpdatedException;
class PortfolioProjectWasNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find portfolio project.');
    }
}
exports.PortfolioProjectWasNotFoundException = PortfolioProjectWasNotFoundException;
class PortfolioProjectsWereNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find any portfolio projects.');
    }
}
exports.PortfolioProjectsWereNotFoundException = PortfolioProjectsWereNotFoundException;
//# sourceMappingURL=portfolio-project.exception.js.map