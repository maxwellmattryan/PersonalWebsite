import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class HttpLogger implements NestMiddleware {
    private readonly logger;
    use(request: Request, response: Response, next: NextFunction): void;
}
