import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopController } from './controllers/shop.controller';
import { ShopProductController } from './controllers/shop-product.controller';
import { ShopProductStatusController } from './controllers/shop-product-status.controller';

import { ShopCategory } from './entities/shop-category.entity';
import { ShopProduct } from './entities/shop-product.entity';
import { ShopProductStatus } from './entities/shop-product-status.entity';

import { ShopProductService } from './services/shop-product.service';
import { ShopProductStatusService } from './services/shop-product-status.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ShopCategory, ShopProduct, ShopProductStatus])
    ],
    exports: [],
    controllers: [
        ShopController,
        ShopProductController,
        ShopProductStatusController
    ],
    providers: [
        ShopProductService,
        ShopProductStatusService
    ]
})
export class ShopModule { }
