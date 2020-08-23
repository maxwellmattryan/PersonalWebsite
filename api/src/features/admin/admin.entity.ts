import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ unique: true, length: 50, nullable: false })
    public username: string;

    @Column({ length: 255, nullable: false })
    @Exclude()
    public password: string;

    constructor(partial: Partial<Admin>) {
        Object.assign(this, partial);
    }
}