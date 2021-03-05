import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService } from '@api/core/database/entity.service';

import { PortfolioProfileStatus } from '../entities/portfolio-profile-status.entity';

@Injectable()
export class PortfolioProfileStatusService extends EntityService<PortfolioProfileStatus> {
    constructor(
        @InjectRepository(PortfolioProfileStatus)
        private readonly portfolioProfileStatusRepository: Repository<PortfolioProfileStatus>
    ) { super(); }

    public async getStatuses(): Promise<PortfolioProfileStatus[]> {
        return this.portfolioProfileStatusRepository
            .createQueryBuilder('ps')
            .getMany();
    }
}
