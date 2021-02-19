import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopCategoryController } from './controllers/shop-category.controller';
import { ShopProductController } from './controllers/shop-product.controller';
import { ShopProductStatusController } from './controllers/shop-product-status.controller';

import { ShopCategory } from './entities/shop-category.entity';
import { ShopProduct } from './entities/shop-product.entity';
import { ShopProductStatus } from './entities/shop-product-status.entity';

import { ShopCategoryService } from './services/shop-category.service';
import { ShopProductService } from './services/shop-product.service';
import { ShopProductStatusService } from './services/shop-product-status.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ShopCategory, ShopProduct, ShopProductStatus])
    ],
    exports: [],
    controllers: [
        ShopCategoryController,
        ShopProductController,
        ShopProductStatusController
    ],
    providers: [
        ShopCategoryService,
        ShopProductService,
        ShopProductStatusService
    ]
})
export class ShopModule { }
