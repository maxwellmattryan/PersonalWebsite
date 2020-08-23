import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@api/core/auth/jwt-auth.guard';

import { Profile } from '@api/features/profile/profile.entity';
import { ProfileService } from '@api/features/profile/profile.service';

@Controller('api')
export class ApiController {
    constructor(
        private readonly profileService: ProfileService
    ) { }

    @Get('')
    @HttpCode(200)
    async getIndex(): Promise<Profile> {
        return await this.profileService.getActiveProfile();
    }

    @Get('test')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async test(): Promise<Profile[]> {
        return await this.profileService.getProfiles();
    }
}