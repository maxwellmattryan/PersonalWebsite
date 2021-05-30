import { HttpExceptionFilter } from '@api/core/http/http-exception.filter';
import { UtilsModule } from '@api/core/utils/utils.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { HttpLogger } from '@api/core/http/http.logger';
import { APP_FILTER } from '@nestjs/core';

@Module({
    imports: [
        UtilsModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ]
})
export class HttpModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(HttpLogger).forRoutes('*');
    }
}
