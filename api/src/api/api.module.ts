import { Module } from '@nestjs/common';

import { ProfileModule } from '@api/profile/profile.module';

import { ApiController } from './api.controller';

@Module({
    /*
    To access other modules' services from within this module,
    make sure to add them in 'exports' in the module decorator's metadata.
     */
    imports: [ProfileModule],
    controllers: [ApiController],
    providers: []
})
export class ApiModule { }