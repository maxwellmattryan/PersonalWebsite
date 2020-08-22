import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ) { }

    public async getActiveProfile(): Promise<Profile> {
        return this.profileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.status', 'ps')
            .where('ps.status = \'ACTIVE\'')
            .getOne()
    }

    public async getProfile(id: number): Promise<Profile> {
        return this.profileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.status', 'ps')
            .where('p.id = :id', { id: id })
            .getOne()
    }

    public async getProfiles(): Promise<Profile[]> {
        return this.profileRepository.find();
    }
}