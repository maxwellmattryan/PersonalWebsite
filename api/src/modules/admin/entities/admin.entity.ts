import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Id } from '@api/core/database/entity.service';

@Entity('admin')
export class Admin {
    constructor(partial: Partial<Admin>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar', length: 6 })
    public id?: Id;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public username: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    @Exclude()
    public password: string;
}