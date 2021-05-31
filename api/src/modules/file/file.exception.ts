import { BadRequestException, NotFoundException } from '@nestjs/common';

export class CannotModifyFilePermissions extends BadRequestException {
    constructor() {
        super('Cannot modify the file\'s permissions (likely to due bucket ACL settings).');
    }
}

export class CannotDeleteFolderException extends BadRequestException {
    constructor() {
        super('Cannot delete entire folders - only individual files.');
    }
}
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
