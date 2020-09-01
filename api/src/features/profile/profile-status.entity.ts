import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Profile } from './profile.entity';

@Entity('profile_status')
export class ProfileStatus {
    constructor(partial: Partial<ProfileStatus>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public status: string;

    @OneToMany(type => Profile, p => p.status)
    public profile: Profile;
}