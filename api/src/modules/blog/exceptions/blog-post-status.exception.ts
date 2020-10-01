import { NotFoundException } from '@nestjs/common';

export class BlogPostStatusesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find blog post statuses.');
    }
}