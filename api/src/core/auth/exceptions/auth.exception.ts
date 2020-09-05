import { BadRequestException } from '@nestjs/common';

export class WrongCredentialsWereProvidedException extends BadRequestException {
    constructor() {
        super('The wrong credentials were provided.');
    }
}

export class NotAllowedToRegisterException extends BadRequestException {
    constructor() {
        super('Not allowed to register.');
    }
}