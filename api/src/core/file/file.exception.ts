import { BadRequestException } from '@nestjs/common';

export class InvalidFileUriException extends BadRequestException {
    constructor() {
        super('The file URI was invalid. Please use a relative path that doesn\'t contain "../".');
    }
}
