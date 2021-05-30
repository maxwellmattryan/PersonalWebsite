import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GCloudModule } from '@api/core/gcloud/gcloud.module';

import { FileController } from './file.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        GCloudModule
    ],
    exports: [],
    controllers: [
        FileController
    ],
    providers: []
})
export class FileModule { }
