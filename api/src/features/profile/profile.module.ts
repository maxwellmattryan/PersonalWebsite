import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileStatus } from './profile-status.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile, ProfileStatus])
    ],
    exports: [
        ProfileService
    ],
    controllers: [
        ProfileController
    ],
    providers: [
        ProfileService
    ]
})
export class ProfileModule { }