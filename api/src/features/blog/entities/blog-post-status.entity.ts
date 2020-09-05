import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { BlogPost } from '../entities/blog-post.entity';

@Entity('blog_post_status')
export class BlogPostStatus {
    constructor(partial: Partial<BlogPostStatus>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public status: string;

    @OneToMany(type => BlogPost, bp => bp.status)
    public post: BlogPost;
}