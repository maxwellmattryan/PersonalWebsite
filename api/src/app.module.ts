import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import * as Joi from '@hapi/joi';

import { AuthModule } from '@api/core/auth/auth.module';
import { DatabaseModule } from '@api/core/database/database.module';
import { GCloudModule } from '@api/core/gcloud/gcloud.module';
import { HttpModule } from '@api/core/http/http.module';
import { UtilsModule } from '@api/core/utils/utils.module';

import { AdminModule } from '@api/modules/admin/admin.module';
import { ApiModule } from '@api/modules/api/api.module';
import { BlogModule } from '@api/modules/blog/blog.module';
import { FileModule } from '@api/modules/file/file.module';
import { PortfolioModule } from '@api/modules/portfolio/portfolio.module';
import { ShopModule } from '@api/modules/shop/shop.module';
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";

@Module({
    imports: [
        CacheModule.register({
            ttl: 60 // seconds
        }),
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                BASE_URL: Joi.string().required(),
                API_URL: Joi.string().required(),

                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USER: Joi.string().required(),
                DB_PASS: Joi.string().required(),
                DB_NAME: Joi.string().required(),

                GCLOUD_CREDENTIALS: Joi.string().required(),
                GCLOUD_ASSETS_STORAGE_BUCKET: Joi.string().required(),
                GCLOUD_PRODUCTS_STORAGE_BUCKET: Joi.string().required(),

                STRIPE_API_URL: Joi.string().required(),
                STRIPE_SK: Joi.string().required(),
                STRIPE_PK: Joi.string().required(),
                STRIPE_TAX_RATE_ID: Joi.string().required(),

                MAILER_HOST: Joi.string().required(),
                MAILER_PORT: Joi.string().required(),
                MAILER_USER: Joi.string().required(),
                MAILER_PASS: Joi.string().required(),

                REDIS_URL: Joi.string().required(),
                REDIS_TLS_URL: Joi.string().required(),

                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRES_IN: Joi.string().required()
            })
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 20
        }),

        AuthModule,
        DatabaseModule,
        GCloudModule,
        HttpModule,
        UtilsModule,

        AdminModule,
        ApiModule,
        BlogModule,
        FileModule,
        PortfolioModule,
        ShopModule
    ],
    exports: [],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule { }
