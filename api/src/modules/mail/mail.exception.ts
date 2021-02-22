import { BadRequestException } from '@nestjs/common';

export class FailedToSendDownloadEmailException extends BadRequestException {
    constructor() {
        super('Failed to send download email.');
    }
}
