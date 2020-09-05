import { NotFoundException } from '@nestjs/common';

export class ProfileTechnologiesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find profile technologies.');
    }
}