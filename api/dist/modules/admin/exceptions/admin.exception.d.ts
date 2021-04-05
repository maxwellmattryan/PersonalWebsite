import { BadRequestException, NotFoundException } from '@nestjs/common';
export declare class AdminAlreadyExistsException extends BadRequestException {
    constructor();
}
export declare class AdminWasNotFoundException extends NotFoundException {
    constructor();
}
