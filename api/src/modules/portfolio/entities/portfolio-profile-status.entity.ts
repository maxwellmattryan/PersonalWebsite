import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Id } from '@api/core/database/entity.service';

import { PortfolioProfile } from './portfolio-profile.entity';

@Entity('portfolio_profile_status')
export class PortfolioProfileStatus {
    constructor(partial: Partial<PortfolioProfileStatus>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar' })
    public id?: Id;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public status: string;

    @OneToMany(type => PortfolioProfile, p => p.status)
    public profiles: PortfolioProfile[];
}