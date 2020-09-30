import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { PortfolioProfile } from './portfolio-profile.entity';

@Entity('portfolio_profile_status')
export class PortfolioProfileStatus {
    constructor(partial: Partial<PortfolioProfileStatus>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public status: string;

    @OneToMany(type => PortfolioProfile, p => p.status)
    public profiles: PortfolioProfile[];
}