import { Module } from '@nestjs/common';

import { BlogModule } from '@api/features/blog/blog.module';
import { ProfileModule } from '@api/features/profile/profile.module';
import { ProjectModule } from '@api/features/project/project.module';

import { ApiController } from './controllers/api.controller';

@Module({
    imports: [
        BlogModule,
        ProfileModule,
        ProjectModule
    ],
    exports: [],
    controllers: [ApiController],
    providers: []
})
export class ApiModule { }