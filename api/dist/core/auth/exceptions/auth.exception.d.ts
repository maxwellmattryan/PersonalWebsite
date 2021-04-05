import { BadRequestException } from '@nestjs/common';
export declare class WrongCredentialsWereProvidedException extends BadRequestException {
    constructor();
}
export declare class NotAllowedToRegisterException extends BadRequestException {
    constructor();
}
