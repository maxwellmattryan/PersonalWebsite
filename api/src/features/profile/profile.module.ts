import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './profile.entity';
import { ProfileStatus } from './profile-status.entity';

import { ProfileService } from './profile.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile, ProfileStatus])
    ],
    exports: [
        ProfileService
    ],
    controllers: [],
    providers: [
        ProfileService
    ]
})
export class ProfileModule { }