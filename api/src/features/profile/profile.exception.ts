import { NotFoundException } from '@nestjs/common';

export class NoActiveProfileWasFoundException extends NotFoundException {
    constructor() {
        super('Unable to find an active profile.');
    }
}

export class NoProfileWasFoundException extends NotFoundException {
    constructor() {
        super('Unable to find requested profile.');
    }
}

export class NoProfilesWereFoundException extends NotFoundException {
    constructor() {
        super('Unable to find profiles.');
    }
}