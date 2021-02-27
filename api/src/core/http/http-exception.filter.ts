import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

export class HttpExceptionFilter extends BaseExceptionFilter {
    constructor() {
        super();
    }

    catch(exception: unknown, host: ArgumentsHost) {
        console.log('Exception thrown: ', exception);
        super.catch(exception, host);
    }
}