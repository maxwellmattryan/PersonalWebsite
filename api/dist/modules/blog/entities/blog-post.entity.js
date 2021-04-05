"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPost = void 0;
const typeorm_1 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const blog_author_entity_1 = require("./blog-author.entity");
const blog_post_status_entity_1 = require("./blog-post-status.entity");
const blog_topic_entity_1 = require("./blog-topic.entity");
let BlogPost = class BlogPost {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 6 }),
    __metadata("design:type", Object)
], BlogPost.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => blog_author_entity_1.BlogAuthor, ba => ba.id),
    __metadata("design:type", blog_author_entity_1.BlogAuthor)
], BlogPost.prototype, "author", void 0);
__decorate([
    typeorm_1.ManyToOne(type => blog_post_status_entity_1.BlogPostStatus, bps => bps.post),
    __metadata("design:type", blog_post_status_entity_1.BlogPostStatus)
], BlogPost.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToMany(type => blog_topic_entity_1.BlogTopic, bt => bt.posts, { onDelete: 'CASCADE' }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], BlogPost.prototype, "topics", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 255, nullable: false, unique: true }),
    __metadata("design:type", String)
], BlogPost.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], BlogPost.prototype, "subtitle", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], BlogPost.prototype, "preview", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], BlogPost.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], BlogPost.prototype, "image_url", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], BlogPost.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' }),
    __metadata("design:type", Date)
], BlogPost.prototype, "updated_at", void 0);
BlogPost = __decorate([
    typeorm_1.Entity('blog_post'),
    __metadata("design:paramtypes", [Object])
], BlogPost);
exports.BlogPost = BlogPost;
//# sourceMappingURL=blog-post.entity.js.map