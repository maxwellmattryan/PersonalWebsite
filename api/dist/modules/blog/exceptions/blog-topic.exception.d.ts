import { BadRequestException, NotFoundException } from '@nestjs/common';
export declare class BlogTopicAlreadyExistsException extends BadRequestException {
    constructor();
}
export declare class BlogTopicCouldNotBeUpdated extends BadRequestException {
    constructor();
}
export declare class BlogTopicWasNotFoundException extends NotFoundException {
    constructor();
}
export declare class BlogTopicsWereNotFoundException extends NotFoundException {
    constructor();
}
