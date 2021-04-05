"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopProductStatusesWereNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class ShopProductStatusesWereNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find shop product statuses.');
    }
}
exports.ShopProductStatusesWereNotFoundException = ShopProductStatusesWereNotFoundException;
//# sourceMappingURL=shop-product-status.exception.js.map