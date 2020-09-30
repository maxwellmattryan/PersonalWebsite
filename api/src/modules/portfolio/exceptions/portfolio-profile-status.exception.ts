import { NotFoundException } from '@nestjs/common';

export class PortfolioProfileStatusesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find profile statuses.');
    }
}