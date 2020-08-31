import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';

import { BlogAuthor } from './blog-author.entity';
import { BlogPostStatus } from './blog-post-status.entity';
import { BlogTopic } from './blog-topic.entity';

@Entity('blog_post')
export class BlogPost {
    constructor(partial: Partial<BlogPost>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(type => BlogAuthor, ba => ba.id)
    public author: BlogAuthor;

    @ManyToOne(type => BlogPostStatus, bps => bps.id)
    public status: BlogPostStatus;

    @ManyToMany(type => BlogTopic, bt => bt.posts, { onDelete: 'CASCADE' })
    @JoinTable()
    public topics: BlogTopic[];

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    public title: string;

    @Column({ type: 'text', nullable: false })
    public preview: string;

    @Column({ type: 'text', nullable: false })
    public content: string;

    @Column({ type: 'text', nullable: false })
    public image_url: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}