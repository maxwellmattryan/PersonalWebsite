import { Controller, Get, HttpCode, Param, Put, Req, UseGuards } from '@nestjs/common';

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
    async activateProfile(@Param('id') id: number, @Req() request: Request): Promise<Profile> {
        // CAUTION: This check is required because all rows will be updated
        if(!(await this.profileService.existsInTable(id))) {
            throw new NoProfileWasFoundException();
        }

        await this.profileService.resetProfileStatuses(id);

        return await this.profileService.getProfile(id);
    }
}
