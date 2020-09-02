import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    ManyToMany, JoinTable
} from 'typeorm';

import { ProfileStatus } from './profile-status.entity';
import { ProfileTechnology } from './profile-technology.entity';

import { Project } from '@api/features/project/project.entity';

@Entity('profile')
export class Profile {
    constructor(partial: Partial<Profile>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(type => ProfileStatus, ps => ps.profiles)
    public status: ProfileStatus;

    @OneToMany(type => ProfileTechnology, pt => pt.profile, { cascade: true, onDelete: 'CASCADE' })
    public technologies: ProfileTechnology[];

    @ManyToMany(type => Project, p => p.profiles, { onDelete: 'CASCADE' })
    @JoinTable()
    public projects: Project[];

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