import { Module } from '@nestjs/common';

import { ProfileModule } from '@api/features/profile/profile.module';

import { ApiController } from './api.controller';

@Module({
    imports: [ProfileModule],
    controllers: [ApiController],
    providers: []
})
export class ApiModule { }