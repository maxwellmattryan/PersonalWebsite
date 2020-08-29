import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Project } from './project.entity';

@Entity('project_link')
export class ProjectLink {
    constructor(partial: Partial<ProjectLink>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public name: string;

    @Column({ type: 'text', nullable: false })
    public url: string;
}