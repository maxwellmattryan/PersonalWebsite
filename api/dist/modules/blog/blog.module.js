"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blog_author_controller_1 = require("./controllers/blog-author.controller");
const blog_post_controller_1 = require("./controllers/blog-post.controller");
const blog_post_status_controller_1 = require("./controllers/blog-post-status.controller");
const blog_topic_controller_1 = require("./controllers/blog-topic.controller");
const blog_author_entity_1 = require("./entities/blog-author.entity");
const blog_post_entity_1 = require("./entities/blog-post.entity");
const blog_post_status_entity_1 = require("./entities/blog-post-status.entity");
const blog_topic_entity_1 = require("./entities/blog-topic.entity");
const blog_author_service_1 = require("./services/blog-author.service");
const blog_post_service_1 = require("./services/blog-post.service");
const blog_post_status_service_1 = require("./services/blog-post-status.service");
const blog_topic_service_1 = require("./services/blog-topic.service");
let BlogModule = class BlogModule {
};
BlogModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([blog_author_entity_1.BlogAuthor, blog_post_entity_1.BlogPost, blog_post_status_entity_1.BlogPostStatus, blog_topic_entity_1.BlogTopic])
        ],
        exports: [
            blog_author_service_1.BlogAuthorService,
            blog_post_service_1.BlogPostService,
            blog_post_status_service_1.BlogPostStatusService,
            blog_topic_service_1.BlogTopicService
        ],
        controllers: [
            blog_author_controller_1.BlogAuthorController,
            blog_post_status_controller_1.BlogPostStatusController,
            blog_post_controller_1.BlogPostController,
            blog_topic_controller_1.BlogTopicController
        ],
        providers: [
            blog_author_service_1.BlogAuthorService,
            blog_post_service_1.BlogPostService,
            blog_post_status_service_1.BlogPostStatusService,
            blog_topic_service_1.BlogTopicService
        ]
    })
], BlogModule);
exports.BlogModule = BlogModule;
//# sourceMappingURL=blog.module.js.map