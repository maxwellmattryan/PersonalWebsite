import { NotFoundException } from '@nestjs/common';

export class ProfileStatusesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find profile statuses.');
    }
}