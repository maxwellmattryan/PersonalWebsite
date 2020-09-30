import { NotFoundException } from '@nestjs/common';

export class PortfolioProfileTechnologiesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find profile technologies.');
    }
}