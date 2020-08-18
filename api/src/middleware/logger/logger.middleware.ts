import { Injectable, NestMiddleware } from '@nestjs/common';

import * as morgan from 'morgan';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        next();
    }
}
