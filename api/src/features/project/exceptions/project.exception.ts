import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ProjectAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Project already exists.');
    }
}

export class ProjectCouldNotBeUpdatedException extends BadRequestException {
    constructor() {
        super('Project could not be updated.');
    }
}

export class ProjectWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find project.');
    }
}

export class ProjectsWereNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find any projects.');
    }
}