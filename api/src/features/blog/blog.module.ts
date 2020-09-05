import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogAuthorController } from './controllers/blog-author.controller';
import { BlogPostController } from './controllers/blog-post.controller';
import { BlogPostStatusController } from './controllers/blog-post-status.controller';
import { BlogTopicController } from './controllers/blog-topic.controller';

import { BlogAuthor } from './entities/blog-author.entity';
import { BlogPost } from './entities/blog-post.entity';
import { BlogPostStatus } from './entities/blog-post-status.entity';
import { BlogTopic } from './entities/blog-topic.entity';

import { BlogAuthorService } from './services/blog-author.service';
import { BlogPostService } from './services/blog-post.service';
import { BlogPostStatusService } from './services/blog-post-status.service';
import { BlogTopicService } from './services/blog-topic.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BlogAuthor, BlogPost, BlogPostStatus, BlogTopic])
    ],
    exports: [
        BlogAuthorService,
        BlogPostService,
        BlogPostStatusService,
        BlogTopicService
    ],
    controllers: [
        BlogAuthorController,
        BlogPostStatusController,
        BlogPostController,
        BlogTopicController
    ],
    providers: [
        BlogAuthorService,
        BlogPostService,
        BlogPostStatusService,
        BlogTopicService
    ]
})
export class BlogModule { }