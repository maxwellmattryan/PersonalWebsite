import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Profile } from '@api/features/profile/profile.entity';

import { Project } from './project.entity';

@Entity('project_profile_mapping')
export class ProjectProfileMapping {
    constructor(partial: Partial<ProjectProfileMapping>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(type => Profile, p => p.id, { onDelete: 'CASCADE' })
    public profile: Profile;

    @ManyToOne(type => Project, p => p.id, { onDelete: 'CASCADE' })
    public project: Project;
}