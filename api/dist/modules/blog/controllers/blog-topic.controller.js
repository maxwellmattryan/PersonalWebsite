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
exports.BlogTopicController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../core/auth/jwt/jwt-auth.guard");
const entity_service_1 = require("../../../core/database/entity.service");
const blog_topic_entity_1 = require("../entities/blog-topic.entity");
const blog_topic_service_1 = require("../services/blog-topic.service");
const blog_topic_exception_1 = require("../exceptions/blog-topic.exception");
let BlogTopicController = class BlogTopicController {
    constructor(blogTopicService) {
        this.blogTopicService = blogTopicService;
    }
    async getTopics() {
        const topics = await this.blogTopicService.getTopics();
        if (topics.length == 0)
            throw new blog_topic_exception_1.BlogTopicsWereNotFoundException();
        return topics;
    }
    async createTopic(topicData) {
        return this.blogTopicService.createTopic(topicData);
    }
    async getTopic(id) {
        const topic = await this.blogTopicService.getTopic(id);
        if (!topic)
            throw new blog_topic_exception_1.BlogTopicWasNotFoundException();
        return topic;
    }
    async updateTopic(id, topicData) {
        const topic = await this.blogTopicService.updateTopic(id, topicData);
        if (!topic)
            throw new blog_topic_exception_1.BlogTopicCouldNotBeUpdated();
        return topic;
    }
    async deleteTopic(id) {
        if (!(await this.blogTopicService.existsInTable(id)))
            throw new blog_topic_exception_1.BlogTopicWasNotFoundException();
        await this.blogTopicService.deleteTopic(id);
    }
};
__decorate([
    common_1.Get(''),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogTopicController.prototype, "getTopics", null);
__decorate([
    common_1.Post(''),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_topic_entity_1.BlogTopic]),
    __metadata("design:returntype", Promise)
], BlogTopicController.prototype, "createTopic", null);
__decorate([
    common_1.Get(':id'),
    common_1.HttpCode(200),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogTopicController.prototype, "getTopic", null);
__decorate([
    common_1.Put(':id'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, blog_topic_entity_1.BlogTopic]),
    __metadata("design:returntype", Promise)
], BlogTopicController.prototype, "updateTopic", null);
__decorate([
    common_1.Delete(':id'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogTopicController.prototype, "deleteTopic", null);
BlogTopicController = __decorate([
    common_1.Controller('blog/topics'),
    __metadata("design:paramtypes", [blog_topic_service_1.BlogTopicService])
], BlogTopicController);
exports.BlogTopicController = BlogTopicController;
//# sourceMappingURL=blog-topic.controller.js.map