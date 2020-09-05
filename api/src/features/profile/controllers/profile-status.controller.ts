import { ProfileStatusService } from '../services/profile-status.service';
import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { ProfileStatus } from '../entities/profile-status.entity';
import { ProfileStatusesWereNotFoundException } from '../exceptions/profile-status.exception';

@Controller('profiles/statuses')
export class ProfileStatusController {
    constructor(
        private readonly profileStatusService: ProfileStatusService
    ) { }

    @Get('')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getProfileStatuses(@Req() request: Request): Promise<ProfileStatus[]> {
        const statuses = await this.profileStatusService.getStatuses();
        if(statuses.length === 0) throw new ProfileStatusesWereNotFoundException();

        return statuses;
    }
}