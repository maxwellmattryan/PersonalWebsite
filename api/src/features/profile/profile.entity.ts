import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';

import { ProfileStatus } from './profile-status.entity';
import { ProfileTechnology } from './profile-technology.entity';

@Entity('profile')
export class Profile {
    constructor(partial: Partial<Profile>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(type => ProfileStatus, ps => ps.profiles)
    public status: ProfileStatus;

    @OneToMany(type => ProfileTechnology, pt => pt.profile)
    public technologies: ProfileTechnology[];

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