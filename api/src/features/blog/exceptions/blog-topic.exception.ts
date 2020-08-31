import { BadRequestException, NotFoundException } from '@nestjs/common';

export class BlogTopicAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Blog topic already exists.');
    }
}

export class BlogTopicCouldNotBeUpdated extends BadRequestException {
    constructor() {
        super('Blog topic could not be updated.');
    }
}

export class BlogTopicWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find blog post.');
    }
}

export class BlogTopicsWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find any blog posts.');
    }
}