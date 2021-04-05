"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogAuthorsWereNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class BlogAuthorsWereNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find blog authors.');
    }
}
exports.BlogAuthorsWereNotFoundException = BlogAuthorsWereNotFoundException;
//# sourceMappingURL=blog-author.exception.js.map