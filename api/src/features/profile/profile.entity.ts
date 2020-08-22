import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { ProfileStatus } from './profile-status.entity';

@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(type => ProfileStatus, profileStatus => profileStatus.status)
    public status: ProfileStatus;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public name: string;

    @Column({ type: 'text', nullable: false })
    public tagline: string;

    @Column({ type: 'text', nullable: false })
    public landing: string;

    @Column({ type: 'text', nullable: false })
    public about: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}