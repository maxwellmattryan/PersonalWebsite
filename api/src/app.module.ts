import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from '@hapi/joi';

import { AuthModule } from '@api/core/auth/auth.module';
import { DatabaseModule } from '@api/core/database/database.module';
import { FileModule } from '@api/core/file/file.module';
import { GCloudModule } from '@api/core/gcloud/gcloud.module';
import { HttpModule } from '@api/core/http/http.module';
import { UtilsModule } from '@api/core/utils/utils.module';

import { AdminModule } from '@api/modules/admin/admin.module';
import { ApiModule } from '@api/modules/api/api.module';
import { BlogModule } from '@api/modules/blog/blog.module';
import { PortfolioModule } from '@api/modules/portfolio/portfolio.module';
import { ShopModule } from '@api/modules/shop/shop.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRES_IN: Joi.string().required(),

                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USER: Joi.string().required(),
                DB_PASS: Joi.string().required(),
                DB_NAME: Joi.string().required(),

                DB_SOCKET_PATH: Joi.string(),
                DB_SSL_CA: Joi.string(),
                DB_SSL_CERT: Joi.string(),
                DB_SSL_KEY: Joi.string(),

                BASE_URL: Joi.string().required(),
                API_URL: Joi.string().required(),

                STRIPE_API_URL: Joi.string().required(),
                STRIPE_SK: Joi.string().required(),
                STRIPE_PK: Joi.string().required(),
                STRIPE_TAX_RATE_ID: Joi.string().required(),

                GOOGLE_CLOUD_PROJECT: Joi.string().required(),
                GCLOUD_STORAGE_BUCKET: Joi.string().required(),
                GCLOUD_CREDENTIALS: Joi.string().required(),

                MAILER_HOST: Joi.string().required(),
                MAILER_PORT: Joi.string().required(),
                MAILER_USER: Joi.string().required(),
                MAILER_PASS: Joi.string().required(),
                MAILER_QUEUE_NAME: Joi.string().required(),
                MAILER_QUEUE_HOST: Joi.string().required(),
                MAILER_QUEUE_PORT: Joi.number().required()
            })
        }),

        AuthModule,
        DatabaseModule,
        FileModule,
        GCloudModule,
        HttpModule,
        UtilsModule,

        AdminModule,
        ApiModule,
        BlogModule,
        PortfolioModule,
        ShopModule
    ],
    exports: [],
    controllers: [],
    providers: []
})
export class AppModule { }
