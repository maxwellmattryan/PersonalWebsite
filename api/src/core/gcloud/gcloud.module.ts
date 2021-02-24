import { Module } from '@nestjs/common';

import { GCloudStorageService } from './gcloud-storage.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot()
    ],
    exports: [
        GCloudStorageService
    ],
    controllers: [],
    providers: [
        GCloudStorageService
    ]
})
export class GCloudModule { }
