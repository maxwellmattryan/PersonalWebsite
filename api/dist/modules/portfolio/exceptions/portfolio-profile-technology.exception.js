"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioProfileTechnologiesWereNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class PortfolioProfileTechnologiesWereNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find profile technologies.');
    }
}
exports.PortfolioProfileTechnologiesWereNotFoundException = PortfolioProfileTechnologiesWereNotFoundException;
//# sourceMappingURL=portfolio-profile-technology.exception.js.map