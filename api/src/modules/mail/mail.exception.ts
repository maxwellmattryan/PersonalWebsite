import { BadRequestException } from '@nestjs/common';

export class FailedToSendOrderEmailException extends BadRequestException {
    constructor() {
        super('Failed to send order email.');
    }
}

export class FailedToSendTestEmailException extends BadRequestException {
    constructor() {
        super('Failed to send test email.');
    }
}
