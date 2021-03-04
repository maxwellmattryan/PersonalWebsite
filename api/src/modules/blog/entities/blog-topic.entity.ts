import {
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    ManyToMany,
    PrimaryColumn
} from 'typeorm';

import { Id } from '@api/core/database/entity.service';

import { BlogPost } from '@api/modules/blog/entities/blog-post.entity';

@Entity('blog_topic')
export class BlogTopic {
    constructor(partial: Partial<BlogTopic>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar' })
    public id?: Id;

    @ManyToMany(type => BlogPost, bp => bp.topics, { onDelete: 'CASCADE' })
    public posts: BlogPost[];

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public name: string;

    @Column({ type: 'text', nullable: false })
    public description: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}
