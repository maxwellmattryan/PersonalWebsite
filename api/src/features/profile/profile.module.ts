import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileController } from './controllers/profile.controller';
import { ProfileStatusController } from './controllers/profile-status.controller';
import { ProfileTechnologyController } from './controllers/profile-technology.controller';

import { Profile } from './entities/profile.entity';
import { ProfileStatus } from './entities/profile-status.entity';
import { ProfileTechnology } from './entities/profile-technology.entity';

import { ProfileService } from './services/profile.service';
import { ProfileStatusService } from './services/profile-status.service';
import { ProfileTechnologyService } from './services/profile-technology.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile, ProfileStatus, ProfileTechnology])
    ],
    exports: [
        ProfileService,
        ProfileStatusService,
        ProfileTechnologyService
    ],
    controllers: [
        ProfileController,
        ProfileStatusController,
        ProfileTechnologyController
    ],
    providers: [
        ProfileService,
        ProfileStatusService,
        ProfileTechnologyService
    ]
})
export class ProfileModule { }