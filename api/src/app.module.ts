import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from '@hapi/joi';

import { HttpModule } from '@api/core/http/http.module';
import { AuthModule } from '@api/core/auth/auth.module';
import { DatabaseModule } from '@api/core/database/database.module';

import { AdminModule } from '@api/features/admin/admin.module';
import { ApiModule } from '@api/features/api/api.module';
import { ProfileModule } from '@api/features/profile/profile.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                PORT: Joi.number(),

                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DB: Joi.string().required(),

                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRES_IN: Joi.string().required()
            })
        }),

        HttpModule,
        AuthModule,
        DatabaseModule,

        AdminModule,
        ApiModule,
        ProfileModule
    ],
    exports: [],
    controllers: [],
    providers: []
})
export class AppModule { }
