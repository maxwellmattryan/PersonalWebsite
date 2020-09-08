import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from '@hapi/joi';

import { AuthModule } from '@api/core/auth/auth.module';
import { DatabaseModule } from '@api/core/database/database.module';
import { HttpModule } from '@api/core/http/http.module';

import { AdminModule } from '@api/features/admin/admin.module';
import { ApiModule } from '@api/features/api/api.module';
import { BlogModule } from '@api/features/blog/blog.module';
import { ProfileModule } from '@api/features/profile/profile.module';
import { ProjectModule } from '@api/features/project/project.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                POSTGRES_SOCKET_PATH: Joi.string().required(),
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
        ProfileModule,
        ProjectModule
    ],
    exports: [],
    controllers: [],
    providers: []
})
export class AppModule { }
