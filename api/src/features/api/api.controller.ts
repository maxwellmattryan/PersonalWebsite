import { Controller, Get, HttpCode } from '@nestjs/common';

import { ProfileService } from '@api/features/profile/profile.service';

@Controller('api')
export class ApiController {
    constructor(
        private readonly profileService: ProfileService
    ) { }

    @Get('')
    @HttpCode(200)
    async getIndex(): Promise<any> {
        return await this.profileService.getActiveProfile();
    }
}