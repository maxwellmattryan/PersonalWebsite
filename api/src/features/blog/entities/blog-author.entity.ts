import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog_author')
export class BlogAuthor {
    constructor(partial: Partial<BlogAuthor>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public first_name: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public last_name: string;
}