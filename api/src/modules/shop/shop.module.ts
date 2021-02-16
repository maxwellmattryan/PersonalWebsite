import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopController } from '@api/modules/shop/controllers/shop.controller';

import { ShopCategory } from './entities/shop-category.entity';
import { ShopProduct } from './entities/shop-product.entity';

// services

@Module({
    imports: [
        TypeOrmModule.forFeature([ShopCategory, ShopProduct])
    ],
    exports: [],
    controllers: [
        ShopController
    ],
    providers: []
})
export class ShopModule { }
