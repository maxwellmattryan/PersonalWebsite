import { ArgumentsHost, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

export class HttpExceptionFilter extends BaseExceptionFilter {
    private readonly logger: Logger = new Logger('HttpExceptionLogger');

    catch(exception: object, host: ArgumentsHost) {
        const statusCode = ((exception as any).response as any).statusCode;
        const error = ((exception as any).response as any).error;
        const message = ((exception as any).response as any).message;

        this.logger.error(`[${statusCode} | ${error}] ${message}`);
        super.catch(exception, host);
    }
}