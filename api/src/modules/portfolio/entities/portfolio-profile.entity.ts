import {
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    ManyToMany, JoinTable, PrimaryColumn
} from 'typeorm';

import { Id } from "@api/core/database/entity.service";

import { PortfolioProfileStatus } from './portfolio-profile-status.entity';
import { PortfolioProfileTechnology } from './portfolio-profile-technology.entity';
import { PortfolioProject } from './portfolio-project.entity';

@Entity('portfolio_profile')
export class PortfolioProfile {
    constructor(partial: Partial<PortfolioProfile>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar' })
    public id?: Id;

    @ManyToOne(type => PortfolioProfileStatus, ps => ps.profiles)
    public status: PortfolioProfileStatus;

    @OneToMany(type => PortfolioProfileTechnology, pt => pt.profile, { cascade: true, onDelete: 'CASCADE' })
    public technologies: PortfolioProfileTechnology[];

    @ManyToMany(type => PortfolioProject, p => p.profiles, { onDelete: 'CASCADE' })
    @JoinTable()
    public projects: PortfolioProject[];

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public name: string;

    @Column({ type: 'text', nullable: false })
    public tagline: string;

    @Column({ type: 'text', nullable: false })
    public landing: string;

    @Column({ type: 'text', nullable: false })
    public about: string;

    @Column({ type: 'text', nullable: false })
    public image_url: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}