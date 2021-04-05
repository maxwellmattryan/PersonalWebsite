import { BadRequestException, NotFoundException } from '@nestjs/common';
export declare class BlogPostWasNotFoundException extends NotFoundException {
    constructor();
}
export declare class BlogPostsWereNotFoundException extends NotFoundException {
    constructor();
}
export declare class BlogPostCouldNotBeUpdated extends BadRequestException {
    constructor();
}
export declare class BlogPostAlreadyExistsException extends BadRequestException {
    constructor();
}
