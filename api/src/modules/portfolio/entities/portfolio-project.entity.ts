import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany
} from 'typeorm';

import { PortfolioProfile } from './portfolio-profile.entity';

@Entity('portfolio_project')
export class PortfolioProject {
    constructor(partial: Partial<PortfolioProject>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToMany(type => PortfolioProfile, p => p.projects, { onDelete: 'CASCADE' })
    public profiles: PortfolioProfile[];

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public name: string;

    @Column({ type: 'text', nullable: false })
    public tagline: string;

    @Column({ type: 'text', nullable: false })
    public description: string;

    @Column({ type: 'text', nullable: false })
    public image_url: string;

    @Column({ type: 'text', nullable: false })
    public link_name: string;

    @Column({ type: 'text', nullable: false })
    public link_url: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}