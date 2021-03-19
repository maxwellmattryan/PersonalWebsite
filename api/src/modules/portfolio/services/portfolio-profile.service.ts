import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService, Id } from '@api/core/database/entity.service';
import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';

import { PortfolioProfile } from '../entities/portfolio-profile.entity';
import { PortfolioProfileStatusService } from './portfolio-profile-status.service';
import { PortfolioProfileTechnologyService } from './portfolio-profile-technology.service';

import { PortfolioProfileAlreadyExistsException } from '../exceptions/portfolio-profile.exception';

@Injectable()
export class PortfolioProfileService extends EntityService<PortfolioProfile> {
    constructor(
        @InjectRepository(PortfolioProfile)
        private readonly portfolioProfileRepository: Repository<PortfolioProfile>,
        private readonly portfolioProfileStatusService: PortfolioProfileStatusService,
        private readonly portfolioProfileTechnologyService: PortfolioProfileTechnologyService
    ) { super(); }

    public async existsInTable(id: Id): Promise<boolean> {
        return await this.portfolioProfileRepository
            .createQueryBuilder('p')
            .where(`p.id = :id`, { id: id })
            .getCount() > 0;
    }

    public async createProfile(profileData: PortfolioProfile): Promise<PortfolioProfile> {
        const profile: PortfolioProfile = this.createEntity(
            this.portfolioProfileRepository.create(profileData),
            ['name']
        );
        profile.technologies = profile.technologies.map(t =>
            this.portfolioProfileTechnologyService.createEntity(t, ['name'])
        );

        if(profile.status.status === 'ACTIVE')
            await this.resetProfileStatuses(profile.id);

        return this.portfolioProfileRepository.save(profile)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
                    throw new PortfolioProfileAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });
    }

    public async deleteProfile(id: Id): Promise<void> {
        if(id == (await this.getProfileByStatus('ACTIVE')).id) {
            await this.resetProfileStatuses((await this.getProfileByStatus('INACTIVE')).id);
        }

        await this.portfolioProfileTechnologyService.deleteTechnologies(id);

        await this.portfolioProfileRepository
            .createQueryBuilder()
            .delete()
            .from(PortfolioProfile)
            .where('portfolio_profile.id = :id', { id: id })
            .execute();
    }

    public async getProfile(id: Id): Promise<PortfolioProfile> {
        return this.portfolioProfileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.technologies', 'pt')
            .leftJoinAndSelect('p.projects', 'prj')
            .leftJoinAndSelect('p.status', 'ps')
            .where('p.id = :id', { id: id })
            .getOne();
    }

    public async getProfileByStatus(status: string): Promise<PortfolioProfile> {
        return this.portfolioProfileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.technologies', 'pt')
            .leftJoinAndSelect('p.status', 'ps')
            .leftJoinAndSelect('p.projects', 'prj')
            .where('ps.status = :status', { status: status })
            .getOne();
    }

    public async getProfiles(): Promise<PortfolioProfile[]> {
        return this.portfolioProfileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.projects', 'prj')
            .leftJoinAndSelect('p.technologies', 'pt')
            .leftJoinAndSelect('p.status', 'ps')
            .getMany();
    }

    public async resetProfileStatuses(activeId: Id): Promise<void> {
        // CAUTION: This query relies on the status to be set to 'ACTIVE' = 9CI7WO and 'INACTIVE' = G3SU5I
        // CAUTION: This query modifies all rows so it is important that the id being used actually exists
        await this.portfolioProfileRepository.query(`
            UPDATE portfolio_profile
            SET status_id = CASE WHEN id = '${activeId}' THEN '9CI7WO' ELSE 'G3SU5I' END,
                updated_at = now();
        `);
    }

    public async updateProfile(id: Id, profileData: PortfolioProfile): Promise<void | PortfolioProfile> {
        // CAUTION: Make sure to activate profile if it was set in the editor and / or verify that at least one profile is always active
        if(id == (await this.getProfileByStatus('ACTIVE')).id)
            if(profileData.status.status === 'INACTIVE')
                await this.resetProfileStatuses((await this.getProfileByStatus('INACTIVE')).id);
        else
            if(profileData.status.status === 'ACTIVE')
                await this.resetProfileStatuses(id);

        await this.portfolioProfileTechnologyService.deleteTechnologies(id);
        await this.portfolioProfileTechnologyService.createTechnologies(profileData.technologies, id);
        const technologies = await this.portfolioProfileTechnologyService.getTechnologies(id);

        return this.portfolioProfileRepository.save(new PortfolioProfile({
            ...profileData,
            technologies: technologies
        }));
    }
}
