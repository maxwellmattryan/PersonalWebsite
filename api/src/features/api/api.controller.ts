import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';

import { Profile } from '@api/features/profile/profile.entity';
import { ProfileService } from '@api/features/profile/profile.service';
import { NoActiveProfileFoundException } from '@api/features/profile/profile.exception';

@Controller('api')
export class ApiController {
    constructor(
        private readonly profileService: ProfileService
    ) { }

    @Get('')
    @HttpCode(200)
    async getIndex(): Promise<{ profile: Profile, posts: string[] }> {
        const profile = await this.profileService.getActiveProfile();
        if(!profile) throw new NoActiveProfileFoundException();

        return { profile: profile, posts: ['', ''] };
    }
}