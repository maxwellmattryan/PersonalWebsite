import { NotFoundException } from '@nestjs/common';

export class NoActiveProfileFoundException extends NotFoundException {
    constructor() {
        super('Unable to find an active profile.');
    }
}