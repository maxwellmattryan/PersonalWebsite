import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

export class ExceptionsLoggerFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        console.log('Exception thrown: ', exception);
        super.catch(exception, host);
    }
}