import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FileController } from './file.controller';

@Module({
    imports: [
        ConfigModule.forRoot()
    ],
    exports: [],
    controllers: [
        FileController
    ],
    providers: []
})
export class FileModule { }
