import { Controller, Get, HttpCode } from '@nestjs/common';

import { ProfileService } from '@api/profile/services/profile.service';

import { Homepage } from '../interfaces/homepage.interface';

@Controller('api')
export class ApiController {
    constructor(
        private readonly profileService: ProfileService
    ) { }

    @Get('')
    @HttpCode(200)
    async getIndex(): Promise<Homepage> {
        let result: Homepage = new Homepage();

        result.profile = await this.profileService.getActiveProfile();

        return result;
    }
}