import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestLoggingInterceptor implements NestInterceptor {
    private readonly logger: Logger = new Logger('RequestLogger');

    private readonly typeMap: object = {
        get: 'GET',
        put: 'PUT',
        delete: 'DELETE',
        post: 'POST'
    };

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();

        let method: string = '';
        Object.keys(req.route.methods).forEach(k => {
            if(req.route.methods[k]) method = this.typeMap[k];
        });

        this.logger.log(`${method} ${req.originalUrl}`);

        return next.handle();
    }
}