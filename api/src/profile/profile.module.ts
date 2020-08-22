import { Module } from '@nestjs/common';

import { ProfileService } from './profile.service';

@Module({
    imports: [],
    exports: [
        ProfileService
    ],
    controllers: [],
    providers: [ProfileService]
})
export class ProfileModule { }