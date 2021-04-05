"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioProfileStatusesWereNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class PortfolioProfileStatusesWereNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find profile statuses.');
    }
}
exports.PortfolioProfileStatusesWereNotFoundException = PortfolioProfileStatusesWereNotFoundException;
//# sourceMappingURL=portfolio-profile-status.exception.js.map