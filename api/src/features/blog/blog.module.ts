import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogAuthor } from './entities/blog-author.entity';
import { BlogPost } from './entities/blog-post.entity';
import { BlogPostStatus } from './entities/blog-post-status.entity';

import { BlogService } from './services/blog.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BlogAuthor, BlogPost, BlogPostStatus])
    ],
    exports: [
        BlogService
    ],
    controllers: [],
    providers: [
        BlogService
    ]
})
export class BlogModule { }