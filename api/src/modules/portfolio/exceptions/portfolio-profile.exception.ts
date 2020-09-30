import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ActivePortfolioProfileWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find an active portfolio profile.');
    }
}

export class PortfolioProfileWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find portfolio profile.');
    }
}

export class PortfolioProfilesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find portfolio profiles.');
    }
}

export class PortfolioProfileCouldNotBeUpdatedException extends BadRequestException {
    constructor() {
        super('Portfolio profile could not be updated.');
    }
}

export class PortfolioProfileAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Portfolio project already exists.');
    }
}