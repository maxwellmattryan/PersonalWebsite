import { Controller, Get, HttpCode, Param, Post, Put, UseGuards, Delete, Body, HttpStatus } from '@nestjs/common';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';
import { Id } from '@api/core/database/entity.service';

import { PortfolioProfile } from '../entities/portfolio-profile.entity';
import { PortfolioProfileService } from '../services/portfolio-profile.service';
import {
    PortfolioProfilesWereNotFoundException,
    PortfolioProfileWasNotFoundException,
    PortfolioProfileCouldNotBeUpdatedException
} from '../exceptions/portfolio-profile.exception';

@Controller('portfolio/profiles')
export class PortfolioProfileController {
    constructor(
        private readonly profileService: PortfolioProfileService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async getProfiles(): Promise<PortfolioProfile[]> {
        const profiles = await this.profileService.getProfiles();
        if(profiles.length == 0) throw new PortfolioProfilesWereNotFoundException();

        return profiles;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    async createProfile(
        @Body() profileData: PortfolioProfile
    ): Promise<PortfolioProfile> {
        return await this.profileService.createProfile(profileData);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async updateProfile(
        @Param('id') id: Id,
        @Body() profileData: PortfolioProfile
    ): Promise<PortfolioProfile> {
        const profile = await this.profileService.updateProfile(id, profileData);
        if(!profile) throw new PortfolioProfileCouldNotBeUpdatedException();

        return profile;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard)
    async deleteProfile(
        @Param('id') id: Id
    ): Promise<void> {
        if(!(await this.profileService.existsInTable(id)))
            throw new PortfolioProfileWasNotFoundException();

        await this.profileService.deleteProfile(id);
    }

    @Put(':id/activate')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async activateProfile(
        @Param('id') id: Id
    ): Promise<PortfolioProfile> {
        // CAUTION: This check is required because all rows will be updated
        if(!(await this.profileService.existsInTable(id))) {
            throw new PortfolioProfileWasNotFoundException();
        }

        await this.profileService.resetProfileStatuses(id);

        return await this.profileService.getProfile(id);
    }
}
