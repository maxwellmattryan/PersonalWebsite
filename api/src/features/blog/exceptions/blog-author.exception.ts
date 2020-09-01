import { NotFoundException } from '@nestjs/common';

export class BlogAuthorsWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find blog authors.');
    }
}