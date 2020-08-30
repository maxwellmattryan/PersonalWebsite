import { NotFoundException } from '@nestjs/common';

export class NoBlogPostsWereFoundException extends NotFoundException {
    constructor() {
        super('Unable to find blog posts.');
    }
}