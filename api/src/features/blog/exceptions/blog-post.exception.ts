import { BadRequestException, NotFoundException } from '@nestjs/common';

export class BlogPostWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find blog post.');
    }
}

export class BlogPostsWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find blog posts.');
    }
}

export class BlogPostCouldNotBeUpdated extends BadRequestException {
    constructor() {
        super('Blog post could not be updated.');
    }
}
