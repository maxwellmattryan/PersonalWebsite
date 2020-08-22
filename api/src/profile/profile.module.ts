import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './entities/profile.entity';
import { ProfileStatus } from './entities/profile-status.entity';

import { ProfileService } from './services/profile.service';

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