import { Module } from '@nestjs/common';

import { ProfileModule } from '@api/profile/profile.module';

import { ApiController } from './controllers/api.controller';

@Module({
    imports: [ProfileModule],
    controllers: [ApiController],
    providers: []
})
export class ApiModule { }