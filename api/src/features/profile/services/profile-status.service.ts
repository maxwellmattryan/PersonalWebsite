import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProfileStatus } from '../entities/profile-status.entity';

@Injectable()
export class ProfileStatusService {
    constructor(
        @InjectRepository(ProfileStatus)
        private readonly profileStatusRepository: Repository<ProfileStatus>
    ) { }

    public async getStatuses(): Promise<ProfileStatus[]> {
        return await this.profileStatusRepository
            .createQueryBuilder('ps')
            .getMany();
    }
}