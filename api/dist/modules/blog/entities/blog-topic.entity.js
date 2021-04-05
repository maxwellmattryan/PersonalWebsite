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
exports.BlogTopic = void 0;
const typeorm_1 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const blog_post_entity_1 = require("./blog-post.entity");
let BlogTopic = class BlogTopic {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 6 }),
    __metadata("design:type", Object)
], BlogTopic.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToMany(type => blog_post_entity_1.BlogPost, bp => bp.topics, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], BlogTopic.prototype, "posts", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], BlogTopic.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], BlogTopic.prototype, "description", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], BlogTopic.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' }),
    __metadata("design:type", Date)
], BlogTopic.prototype, "updated_at", void 0);
BlogTopic = __decorate([
    typeorm_1.Entity('blog_topic'),
    __metadata("design:paramtypes", [Object])
], BlogTopic);
exports.BlogTopic = BlogTopic;
//# sourceMappingURL=blog-topic.entity.js.map