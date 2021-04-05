"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostStatusesWereNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class BlogPostStatusesWereNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find blog post statuses.');
    }
}
exports.BlogPostStatusesWereNotFoundException = BlogPostStatusesWereNotFoundException;
//# sourceMappingURL=blog-post-status.exception.js.map