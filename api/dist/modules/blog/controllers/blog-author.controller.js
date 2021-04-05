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
exports.BlogAuthorController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../core/auth/jwt/jwt-auth.guard");
const blog_author_service_1 = require("../services/blog-author.service");
const blog_author_exception_1 = require("../exceptions/blog-author.exception");
let BlogAuthorController = class BlogAuthorController {
    constructor(blogAuthorService) {
        this.blogAuthorService = blogAuthorService;
    }
    async getAuthors() {
        const authors = await this.blogAuthorService.getAuthors();
        if (authors.length === 0)
            throw new blog_author_exception_1.BlogAuthorsWereNotFoundException();
        return authors;
    }
};
__decorate([
    common_1.Get(''),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogAuthorController.prototype, "getAuthors", null);
BlogAuthorController = __decorate([
    common_1.Controller('blog/authors'),
    __metadata("design:paramtypes", [blog_author_service_1.BlogAuthorService])
], BlogAuthorController);
exports.BlogAuthorController = BlogAuthorController;
//# sourceMappingURL=blog-author.controller.js.map