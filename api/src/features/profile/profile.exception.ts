import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ActiveProfileWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find an active profile.');
    }
}

export class ProfileWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find profile.');
    }
}

export class ProfilesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find profiles.');
    }
}

export class ProfileStatusesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find profile statuses.');
    }
}

export class ProfileTechnologiesWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find profile technologies.');
    }
}

export class ProfileCouldNotBeUpdatedException extends BadRequestException {
    constructor() {
        super('Profile could not be updated.');
    }
}

export class ProfileAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Project already exists.');
    }
}