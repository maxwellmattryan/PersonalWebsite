import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogPostController } from './controllers/blog-post.controller';
import { BlogTopicController } from './controllers/blog-topic.controller';

import { BlogAuthor } from './entities/blog-author.entity';
import { BlogPost } from './entities/blog-post.entity';
import { BlogPostStatus } from './entities/blog-post-status.entity';
import { BlogTopic } from './entities/blog-topic.entity';

import { BlogPostService } from './services/blog-post.service';
import { BlogTopicService } from './services/blog-topic.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BlogAuthor, BlogPost, BlogPostStatus, BlogTopic])
    ],
    exports: [
        BlogPostService,
        BlogTopicService
    ],
    controllers: [
        BlogPostController,
        BlogTopicController
    ],
    providers: [
        BlogPostService,
        BlogTopicService
    ]
})
export class BlogModule { }