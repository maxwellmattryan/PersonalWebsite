import { BadRequestException } from '@nestjs/common';

export class FailedToSendMultiDownloadEmailException extends BadRequestException {
    constructor() {
        super('Failed to send multi download email.');
    }
}

export class FailedToSendOrderConfirmationEmailException extends BadRequestException {
    constructor() {
        super('Failed to send order confirmation email.');
    }
}
