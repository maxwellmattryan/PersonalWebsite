import { BadRequestException } from '@nestjs/common';

export class WrongCredentialsProvidedException extends BadRequestException {
    constructor() {
        super(`Wrong credentials were provided.`);
    }
}