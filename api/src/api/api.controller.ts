import { Controller, Get, HttpCode } from '@nestjs/common';

import { ProfileService } from '@api/profile/profile.service';

@Controller('api')
export class ApiController {
    constructor(
        private readonly profileService: ProfileService
    ) { }

    /*
    Returns JSON data from profile, project, and blog queries needed
    for the application's index page.
     */
    @Get('')
    @HttpCode(200)
    async getIndex(): Promise<string> {
        return await this.profileService.getProfiles();
    }
}