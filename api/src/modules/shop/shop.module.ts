import { Module } from '@nestjs/common';

import { ShopController } from '@api/modules/shop/controllers/shop.controller';

// entities

// services

@Module({
    imports: [],
    exports: [],
    controllers: [
        ShopController
    ],
    providers: []
})
export class ShopModule { }
