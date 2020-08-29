import { Module } from '@nestjs/common';

import { ProfileModule } from '@api/features/profile/profile.module';
import { ProjectModule } from '@api/features/project/project.module';

import { ApiController } from './api.controller';

@Module({
    imports: [
        ProfileModule,
        ProjectModule
    ],
    exports: [],
    controllers: [ApiController],
    providers: []
})
export class ApiModule { }