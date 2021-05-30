import { Module } from '@nestjs/common';

import { ExtendedLogger } from '@api/core/utils/extended-logger';
import { UtilsService } from '@api/core/utils/utils.service';

@Module({
    imports: [],
    exports: [
        ExtendedLogger,
        UtilsService
    ],
    controllers: [],
    providers: [
        ExtendedLogger,
        UtilsService
    ]
})
export class UtilsModule { }
