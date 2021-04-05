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
exports.BlogPostStatusController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../core/auth/jwt/jwt-auth.guard");
const blog_post_status_service_1 = require("../services/blog-post-status.service");
const blog_post_status_exception_1 = require("../exceptions/blog-post-status.exception");
let BlogPostStatusController = class BlogPostStatusController {
    constructor(blogPostStatusService) {
        this.blogPostStatusService = blogPostStatusService;
    }
    async getPostStatuses() {
        const statuses = await this.blogPostStatusService.getStatuses();
        if (statuses.length === 0)
            throw new blog_post_status_exception_1.BlogPostStatusesWereNotFoundException();
        return statuses;
    }
};
__decorate([
    common_1.Get(''),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogPostStatusController.prototype, "getPostStatuses", null);
BlogPostStatusController = __decorate([
    common_1.Controller('blog/post-statuses'),
    __metadata("design:paramtypes", [blog_post_status_service_1.BlogPostStatusService])
], BlogPostStatusController);
exports.BlogPostStatusController = BlogPostStatusController;
//# sourceMappingURL=blog-post-status.controller.js.map