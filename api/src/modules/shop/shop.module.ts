import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GCloudModule } from '@api/core/gcloud/gcloud.module';

import { MailModule } from '@api/modules/mail/mail.module';

import { ShopCategoryController } from './controllers/shop-category.controller';
import { ShopCheckoutController } from './controllers/shop-checkout.controller';
import { ShopCustomerController } from './controllers/shop-customer.controller';
import { ShopOrderController } from './controllers/shop-order.controller';
import { ShopProductController } from './controllers/shop-product.controller';
import { ShopProductStatusController } from './controllers/shop-product-status.controller';

import { ShopCategory } from './entities/shop-category.entity';
import { ShopCustomer } from './entities/shop-customer.entity';
import { ShopOrder } from './entities/shop-order.entity';
import { ShopProduct } from './entities/shop-product.entity';
import { ShopProductStatus } from './entities/shop-product-status.entity';

import { ShopCategoryService } from './services/shop-category.service';
import { ShopCheckoutService } from './services/shop-checkout.service';
import { ShopCustomerService } from './services/shop-customer.service';
import { ShopOrderService } from './services/shop-order.service';
import { ShopProductService } from './services/shop-product.service';
import { ShopProductStatusService } from './services/shop-product-status.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        GCloudModule,
        HttpModule,
        MailModule,
        TypeOrmModule.forFeature([ShopCategory, ShopCustomer, ShopOrder, ShopProduct, ShopProductStatus])
    ],
    exports: [],
    controllers: [
        ShopCategoryController,
        ShopCheckoutController,
        ShopCustomerController,
        ShopOrderController,
        ShopProductController,
        ShopProductStatusController
    ],
    providers: [
        ShopCategoryService,
        ShopCheckoutService,
        ShopCustomerService,
        ShopOrderService,
        ShopProductService,
        ShopProductStatusService
    ]
})
export class ShopModule { }
