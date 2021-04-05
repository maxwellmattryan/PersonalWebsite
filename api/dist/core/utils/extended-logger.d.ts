import { Logger } from '@nestjs/common';
export declare class ExtendedLogger extends Logger {
    private static createResponseLog;
    debug(message: string, ctx?: string | undefined): void;
    debugResponse(message: string, statusCode?: number, ctx?: string | undefined): void;
    info(message: string, ctx?: string | undefined): void;
    infoResponse(message: string, statusCode?: number, ctx?: string | undefined): void;
    error(message: string, trace?: string, ctx?: string | undefined): void;
    errorResponse(message: string, statusCode?: number, trace?: string, ctx?: string | undefined): void;
}
