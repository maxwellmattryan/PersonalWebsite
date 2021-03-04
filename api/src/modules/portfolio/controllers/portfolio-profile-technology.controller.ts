import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { PortfolioProfileTechnology } from '../entities/portfolio-profile-technology.entity';
import { PortfolioProfileTechnologyService } from '../services/portfolio-profile-technology.service';
import { PortfolioProfileTechnologiesWereNotFoundException } from '../exceptions/portfolio-profile-technology.exception';

@Controller('portfolio/profiles/:id/technologies')
export class PortfolioProfileTechnologyController {
    constructor(
        private readonly profileTechnologyService: PortfolioProfileTechnologyService
    ) { }

    @Get('')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getProfileTechnologies(
        @Param('id') id: number
    ): Promise<PortfolioProfileTechnology[]> {
        const technologies = await this.profileTechnologyService.getTechnologies(id);
        if(technologies.length === 0) throw new PortfolioProfileTechnologiesWereNotFoundException();

        return technologies;
    }
}