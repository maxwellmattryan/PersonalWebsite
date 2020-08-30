import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog_post_status')
export class BlogPostStatus {
    constructor(partial: Partial<BlogPostStatus>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public status: string;
}