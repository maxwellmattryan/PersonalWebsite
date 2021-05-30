import { Column, Entity, PrimaryColumn } from 'typeorm';

import { Id } from '@api/core/database/entity.service';

@Entity('blog_author')
export class BlogAuthor {
    constructor(partial: Partial<BlogAuthor>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar', length: 6 })
    public id?: Id;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public first_name: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public last_name: string;
}
