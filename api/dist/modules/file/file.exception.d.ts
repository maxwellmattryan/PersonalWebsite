import { BadRequestException, NotFoundException } from '@nestjs/common';
export declare class CannotDeleteFolderException extends BadRequestException {
    constructor();
}
export declare class FileWasNotFoundException extends NotFoundException {
    constructor();
}
export declare class InvalidFileUriException extends BadRequestException {
    constructor();
}
