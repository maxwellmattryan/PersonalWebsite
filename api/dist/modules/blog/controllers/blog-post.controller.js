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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../core/auth/jwt/jwt-auth.guard");
const entity_service_1 = require("../../../core/database/entity.service");
const blog_post_entity_1 = require("../entities/blog-post.entity");
const blog_post_service_1 = require("../services/blog-post.service");
const blog_post_exception_1 = require("../exceptions/blog-post.exception");
let BlogPostController = class BlogPostController {
    constructor(blogPostService) {
        this.blogPostService = blogPostService;
    }
    async getPosts(topicId, isPublished) {
        let posts;
        if (isPublished === 'true') {
            if (topicId)
                posts = await this.blogPostService.getPostsByStatusAndTopic('PUBLISHED', topicId);
            else
                posts = await this.blogPostService.getPostsByStatus('PUBLISHED');
        }
        else {
            if (topicId)
                posts = await this.blogPostService.getPostsByTopic(topicId);
            else
                posts = await this.blogPostService.getPosts();
        }
        if (posts.length == 0)
            throw new blog_post_exception_1.BlogPostsWereNotFoundException();
        return posts;
    }
    async createPost(postData) {
        return this.blogPostService.createPost(postData);
    }
    async getPost(id) {
        const post = await this.blogPostService.getPost(id);
        if (!post)
            throw new blog_post_exception_1.BlogPostWasNotFoundException();
        return post;
    }
    async updatePost(id, postData) {
        const post = await this.blogPostService.updatePost(id, postData);
        if (!post)
            throw new blog_post_exception_1.BlogPostCouldNotBeUpdated();
        return post;
    }
    async deletePost(id) {
        if (!(await this.blogPostService.existsInTable(id)))
            throw new blog_post_exception_1.BlogPostWasNotFoundException();
        await this.blogPostService.deletePost(id);
    }
};
__decorate([
    common_1.Get(''),
    common_1.HttpCode(200),
    __param(0, common_1.Query('topicId')),
    __param(1, common_1.Query('isPublished')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BlogPostController.prototype, "getPosts", null);
__decorate([
    common_1.Post(''),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_post_entity_1.BlogPost]),
    __metadata("design:returntype", Promise)
], BlogPostController.prototype, "createPost", null);
__decorate([
    common_1.Get(':id'),
    common_1.HttpCode(200),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogPostController.prototype, "getPost", null);
__decorate([
    common_1.Put(':id'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, blog_post_entity_1.BlogPost]),
    __metadata("design:returntype", Promise)
], BlogPostController.prototype, "updatePost", null);
__decorate([
    common_1.Delete(':id'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogPostController.prototype, "deletePost", null);
BlogPostController = __decorate([
    common_1.Controller('blog/posts'),
    __metadata("design:paramtypes", [blog_post_service_1.BlogPostService])
], BlogPostController);
exports.BlogPostController = BlogPostController;
//# sourceMappingURL=blog-post.controller.js.map