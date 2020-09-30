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

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                POSTGRES_SOCKET_PATH: Joi.string(),
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DB: Joi.string().required(),

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
        PortfolioModule
    ],
    exports: [],
    controllers: [],
    providers: []
})
export class AppModule { }
