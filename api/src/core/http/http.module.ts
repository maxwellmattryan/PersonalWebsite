import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ExceptionsLoggerFilter } from './exceptions-logger.filter';

@Module({
    providers: [
        {
            provide: APP_FILTER,
            useClass: ExceptionsLoggerFilter
        }
    ]
})
export class HttpModule { }