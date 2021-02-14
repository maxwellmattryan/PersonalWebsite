import { Module } from '@nestjs/common';

import { StoreController } from '@api/modules/store/controllers/store.controller';

// entities

// services

@Module({
    imports: [],
    exports: [],
    controllers: [
        StoreController
    ],
    providers: []
})
export class StoreModule { }
