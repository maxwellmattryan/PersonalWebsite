import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileController } from './controllers/profile.controller';

import { Profile } from './entities/profile.entity';
import { ProfileStatus } from './entities/profile-status.entity';
import { ProfileTechnology } from './entities/profile-technology.entity';

import { ProfileService } from './services/profile.service';

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