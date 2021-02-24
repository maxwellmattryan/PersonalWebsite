import { Module } from '@nestjs/common';

import { UtilsService } from '@api/core/utils/utils.service';

@Module({
    imports: [],
    exports: [
        UtilsService
    ],
    controllers: [],
    providers: [
        UtilsService
    ]
})
export class UtilsModule { }
