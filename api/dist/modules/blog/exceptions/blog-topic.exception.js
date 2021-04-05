"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogTopicsWereNotFoundException = exports.BlogTopicWasNotFoundException = exports.BlogTopicCouldNotBeUpdated = exports.BlogTopicAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class BlogTopicAlreadyExistsException extends common_1.BadRequestException {
    constructor() {
        super('Blog topic already exists.');
    }
}
exports.BlogTopicAlreadyExistsException = BlogTopicAlreadyExistsException;
class BlogTopicCouldNotBeUpdated extends common_1.BadRequestException {
    constructor() {
        super('Blog topic could not be updated.');
    }
}
exports.BlogTopicCouldNotBeUpdated = BlogTopicCouldNotBeUpdated;
class BlogTopicWasNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find blog post.');
    }
}
exports.BlogTopicWasNotFoundException = BlogTopicWasNotFoundException;
class BlogTopicsWereNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find any blog posts.');
    }
}
exports.BlogTopicsWereNotFoundException = BlogTopicsWereNotFoundException;
//# sourceMappingURL=blog-topic.exception.js.map