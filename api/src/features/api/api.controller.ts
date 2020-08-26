import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';

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
}