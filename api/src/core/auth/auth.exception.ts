import { BadRequestException } from '@nestjs/common';

export class WrongCredentialsWereProvidedException extends BadRequestException {
    constructor() {
        super('The wrong credentials were provided.');
    }
}