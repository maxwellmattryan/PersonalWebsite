import { BadRequestException, NotFoundException } from '@nestjs/common';

export class PortfolioProjectAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Portfolio project already exists.');
    }
}

export class PortfolioProjectCouldNotBeUpdatedException extends BadRequestException {
    constructor() {
        super('Portfolio project could not be updated.');
    }
}

export class PortfolioProjectWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find portfolio project.');
    }
}

export class PortfolioProjectsWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find any portfolio projects.');
    }
}