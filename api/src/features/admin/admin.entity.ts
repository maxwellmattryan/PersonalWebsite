import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ unique: true, length: 50, nullable: false })
    public username: string;

    @Column({ length: 255, nullable: false })
    public password: string;
}