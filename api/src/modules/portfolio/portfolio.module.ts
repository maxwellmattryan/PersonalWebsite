import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PortfolioProfileController } from './controllers/portfolio-profile.controller';
import { PortfolioProfileStatusController } from './controllers/portfolio-profile-status.controller';
import { PortfolioProfileTechnologyController } from './controllers/portfolio-profile-technology.controller';
import { PortfolioProjectController } from './controllers/portfolio-project.controller';

import { PortfolioProfile } from './entities/portfolio-profile.entity';
import { PortfolioProfileStatus } from './entities/portfolio-profile-status.entity';
import { PortfolioProfileTechnology } from './entities/portfolio-profile-technology.entity';
import { PortfolioProject } from '@api/modules/portfolio/entities/portfolio-project.entity';

import { PortfolioProfileService } from './services/portfolio-profile.service';
import { PortfolioProfileStatusService } from './services/portfolio-profile-status.service';
import { PortfolioProfileTechnologyService } from './services/portfolio-profile-technology.service';
import { PortfolioProjectService } from '@api/modules/portfolio/services/portfolio-project.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PortfolioProfile, PortfolioProfileStatus, PortfolioProfileTechnology, PortfolioProject])
    ],
    exports: [
        PortfolioProfileService,
        PortfolioProfileStatusService,
        PortfolioProfileTechnologyService,
        PortfolioProjectService
    ],
    controllers: [
        PortfolioProfileController,
        PortfolioProfileStatusController,
        PortfolioProfileTechnologyController,
        PortfolioProjectController
    ],
    providers: [
        PortfolioProfileService,
        PortfolioProfileStatusService,
        PortfolioProfileTechnologyService,
        PortfolioProjectService
    ]
})
export class PortfolioModule { }
