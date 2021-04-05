"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidFileUriException = exports.FileWasNotFoundException = exports.CannotDeleteFolderException = void 0;
const common_1 = require("@nestjs/common");
class CannotDeleteFolderException extends common_1.BadRequestException {
    constructor() {
        super('Cannot delete entire folders - only individual files.');
    }
}
exports.CannotDeleteFolderException = CannotDeleteFolderException;
class FileWasNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('Unable to find file with specified URI.');
    }
}
exports.FileWasNotFoundException = FileWasNotFoundException;
class InvalidFileUriException extends common_1.BadRequestException {
    constructor() {
        super('The file URI was invalid. Please use a relative path that doesn\'t contain "../".');
    }
}
exports.InvalidFileUriException = InvalidFileUriException;
//# sourceMappingURL=file.exception.js.map