"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostAlreadyExistsException = exports.BlogPostCouldNotBeUpdated = exports.BlogPostsWereNotFoundException = exports.BlogPostWasNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class BlogPostWasNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find blog post.');
    }
}
exports.BlogPostWasNotFoundException = BlogPostWasNotFoundException;
class BlogPostsWereNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find blog posts.');
    }
}
exports.BlogPostsWereNotFoundException = BlogPostsWereNotFoundException;
class BlogPostCouldNotBeUpdated extends common_1.BadRequestException {
    constructor() {
        super('Blog post could not be updated.');
    }
}
exports.BlogPostCouldNotBeUpdated = BlogPostCouldNotBeUpdated;
class BlogPostAlreadyExistsException extends common_1.BadRequestException {
    constructor() {
        super('Blog post already exists.');
    }
}
exports.BlogPostAlreadyExistsException = BlogPostAlreadyExistsException;
//# sourceMappingURL=blog-post.exception.js.map