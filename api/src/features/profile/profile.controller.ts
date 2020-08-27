import { Controller, Get, HttpCode, Put, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { NoProfilesWereFoundException, NoProfileWasFoundException } from './profile.exception';

@Controller('api/profiles')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ) { }

    @Get('')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async listProfiles(@Req() request: Request): Promise<Profile[]> {
        const profiles = await this.profileService.getProfiles();
        if(profiles.length == 0) throw new NoProfilesWereFoundException();

        return profiles;
    }

    @Put(':id/activate')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async activateProfile(@Req() request: Request): Promise<Profile> {
        const profileData: Profile = request.body;

        // CAUTION: This check is required because all rows will be updated
        if(!(await this.profileService.existsInTable(profileData.id))) {
            throw new NoProfileWasFoundException();
        }

        await this.profileService.resetProfileStatuses(profileData.id);

        return await this.profileService.getProfile(profileData.id);
    }
}
