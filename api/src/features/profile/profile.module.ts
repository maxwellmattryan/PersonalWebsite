import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './profile.entity';
import { ProfileStatus } from './profile-status.entity';
import { ProfileTechnology } from './profile-technology.entity';

import { ProfileController } from './profile.controller';

import { ProfileService } from './profile.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile, ProfileStatus, ProfileTechnology])
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