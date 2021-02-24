import { BadRequestException } from '@nestjs/common';

export class FailedToSendMultiDownloadEmailException extends BadRequestException {
    constructor() {
        super('Failed to send multi download email.');
    }
}

export class FailedToSendOrderDownloadEmailException extends BadRequestException {
    constructor() {
        super('Failed to send order download email.');
    }
}

export class FailedToSendTestEmailException extends BadRequestException {
    constructor() {
        super('Failed to send test email.');
    }
}
