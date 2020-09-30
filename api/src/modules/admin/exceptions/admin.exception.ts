import { BadRequestException, NotFoundException } from '@nestjs/common';

export class AdminAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Admin already exists.');
    }
}

export class AdminWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find admin.');
    }
}