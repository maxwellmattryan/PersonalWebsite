import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiModule } from './api/api.module';
import { ProfileModule } from './profile/profile.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ApiModule,
        ProfileModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule { }
