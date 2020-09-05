import { Controller, Get, HttpCode, Param, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { ProfileTechnology } from '../entities/profile-technology.entity';
import { ProfileTechnologyService } from '../services/profile-technology.service';
import { ProfileTechnologiesWereNotFoundException } from '../exceptions/profile-technology.exception';

@Controller('profiles/:id/technologies')
export class ProfileTechnologyController {
    constructor(
        private readonly profileTechnologyService: ProfileTechnologyService
    ) { }

    @Get('')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getProfileTechnologies(@Param('id') id: number, @Req() request: Request): Promise<ProfileTechnology[]> {
        const technologies = await this.profileTechnologyService.getTechnologies(id);
        if(technologies.length === 0) throw new ProfileTechnologiesWereNotFoundException();

        return technologies;
    }
}