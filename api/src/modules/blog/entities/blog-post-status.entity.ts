import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Id } from "@api/core/database/entity.service";

import { BlogPost } from '../entities/blog-post.entity';

@Entity('blog_post_status')
export class BlogPostStatus {
    constructor(partial: Partial<BlogPostStatus>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar' })
    public id?: Id;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public status: string;

    @OneToMany(type => BlogPost, bp => bp.status)
    public post: BlogPost;
}
