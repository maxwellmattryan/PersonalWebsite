import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
export declare class HttpExceptionFilter extends BaseExceptionFilter {
    private readonly logger;
    catch(exception: Error, host: ArgumentsHost): void;
    private handleException;
    private handleHttpException;
}
