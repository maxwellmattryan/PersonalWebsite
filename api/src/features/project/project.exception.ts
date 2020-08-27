import { NotFoundException } from '@nestjs/common';

export class NoProjectsWereFoundException extends NotFoundException {
    constructor() {
        super('Unable to find any projects.');
    }
}