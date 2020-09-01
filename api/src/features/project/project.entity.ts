import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne, JoinColumn, ManyToMany
} from 'typeorm';

import { ProjectLink } from './project-link.entity';

import { Profile } from '@api/features/profile/profile.entity';

@Entity('project')
export class Project {
    constructor(partial: Partial<Project>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @OneToOne(type => ProjectLink, { cascade: true })
    @JoinColumn()
    public link: ProjectLink;

    @ManyToMany(type => Profile, p => p.projects, { onDelete: 'CASCADE' })
    public profiles: Profile[];

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public name: string;

    @Column({ type: 'text', nullable: false })
    public tagline: string;

    @Column({ type: 'text', nullable: false })
    public description: string;

    @Column({ type: 'text', nullable: false })
    public image_url: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}