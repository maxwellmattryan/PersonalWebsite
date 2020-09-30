import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { PortfolioProfile } from './portfolio-profile.entity';

@Entity('portfolio_profile_technology')
export class PortfolioProfileTechnology {
    constructor(partial: Partial<PortfolioProfileTechnology>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(type => PortfolioProfile, p => p.technologies)
    @Exclude()
    public profile: PortfolioProfile;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public name: string;

    @Column({ type: 'int', nullable: false })
    public display_order: number;
}