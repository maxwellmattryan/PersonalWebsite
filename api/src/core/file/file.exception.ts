import { BadRequestException, NotFoundException } from '@nestjs/common';

export class FileWasNotFoundException extends NotFoundException {
    constructor() {
        super('Unable to find file with specified URI.');
    }
}

export class InvalidFileUriException extends BadRequestException {
    constructor() {
        super('The file URI was invalid. Please use a relative path that doesn\'t contain "../".');
    }
}
