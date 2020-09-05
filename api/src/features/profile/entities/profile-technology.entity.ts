import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Profile } from './profile.entity';

@Entity('profile_technology')
export class ProfileTechnology {
    constructor(partial: Partial<ProfileTechnology>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(type => Profile, p => p.technologies)
    @Exclude()
    public profile: Profile;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public name: string;

    @Column({ type: 'int', nullable: false })
    public display_order: number;
}