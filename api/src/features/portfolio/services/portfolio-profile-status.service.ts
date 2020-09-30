import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PortfolioProfileStatus } from '../entities/portfolio-profile-status.entity';

@Injectable()
export class PortfolioProfileStatusService {
    constructor(
        @InjectRepository(PortfolioProfileStatus)
        private readonly portfolioProfileStatusRepository: Repository<PortfolioProfileStatus>
    ) { }

    public async getStatuses(): Promise<PortfolioProfileStatus[]> {
        return await this.portfolioProfileStatusRepository
            .createQueryBuilder('ps')
            .getMany();
    }
}