import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from '@hapi/joi';

import { AuthModule } from '@api/core/auth/auth.module';
import { DatabaseModule } from '@api/core/database/database.module';
import { HttpModule } from '@api/core/http/http.module';

import { AdminModule } from '@api/modules/admin/admin.module';
import { ApiModule } from '@api/modules/api/api.module';
import { BlogModule } from '@api/modules/blog/blog.module';
import { PortfolioModule } from '@api/modules/portfolio/portfolio.module';
import { ShopModule } from '@api/modules/shop/shop.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DATABASE_URL: Joi.string().required(),
                DATABASE_USE_SSL: Joi.boolean().required(),

                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRES_IN: Joi.string().required()
            })
        }),

        AuthModule,
        DatabaseModule,
        HttpModule,

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
