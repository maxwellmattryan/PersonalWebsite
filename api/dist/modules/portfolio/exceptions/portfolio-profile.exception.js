"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioProfileAlreadyExistsException = exports.PortfolioProfileCouldNotBeUpdatedException = exports.PortfolioProfilesWereNotFoundException = exports.PortfolioProfileWasNotFoundException = exports.ActivePortfolioProfileWasNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class ActivePortfolioProfileWasNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find an active portfolio profile.');
    }
}
exports.ActivePortfolioProfileWasNotFoundException = ActivePortfolioProfileWasNotFoundException;
class PortfolioProfileWasNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find portfolio profile.');
    }
}
exports.PortfolioProfileWasNotFoundException = PortfolioProfileWasNotFoundException;
class PortfolioProfilesWereNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find portfolio profiles.');
    }
}
exports.PortfolioProfilesWereNotFoundException = PortfolioProfilesWereNotFoundException;
class PortfolioProfileCouldNotBeUpdatedException extends common_1.BadRequestException {
    constructor() {
        super('Portfolio profile could not be updated.');
    }
}
exports.PortfolioProfileCouldNotBeUpdatedException = PortfolioProfileCouldNotBeUpdatedException;
class PortfolioProfileAlreadyExistsException extends common_1.BadRequestException {
    constructor() {
        super('Portfolio project already exists.');
    }
}
exports.PortfolioProfileAlreadyExistsException = PortfolioProfileAlreadyExistsException;
//# sourceMappingURL=portfolio-profile.exception.js.map