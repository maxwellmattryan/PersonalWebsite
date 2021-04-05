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
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const blog_post_entity_1 = require("../../blog/entities/blog-post.entity");
const portfolio_profile_entity_1 = require("../../portfolio/entities/portfolio-profile.entity");
const blog_post_service_1 = require("../../blog/services/blog-post.service");
const portfolio_profile_service_1 = require("../../portfolio/services/portfolio-profile.service");
const portfolio_project_service_1 = require("../../portfolio/services/portfolio-project.service");
const blog_post_exception_1 = require("../../blog/exceptions/blog-post.exception");
const portfolio_profile_exception_1 = require("../../portfolio/exceptions/portfolio-profile.exception");
const portfolio_project_exception_1 = require("../../portfolio/exceptions/portfolio-project.exception");
let ApiController = class ApiController {
    constructor(blogService, profileService, projectService) {
        this.blogService = blogService;
        this.profileService = profileService;
        this.projectService = projectService;
    }
    async getHomepage() {
        const profile = await this.profileService.getProfileByStatus('ACTIVE');
        if (!profile)
            throw new portfolio_profile_exception_1.ActivePortfolioProfileWasNotFoundException();
        const projects = await this.projectService.getProjectsForProfile(profile.id);
        if (projects.length == 0)
            throw new portfolio_project_exception_1.PortfolioProjectsWereNotFoundException();
        profile.projects = projects;
        let posts = await this.blogService.getPostsByStatus('PUBLISHED');
        if (posts.length == 0)
            throw new blog_post_exception_1.BlogPostsWereNotFoundException();
        posts = posts.slice(0, 3);
        return { profile: profile, posts: posts };
    }
};
__decorate([
    common_1.Get('home'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getHomepage", null);
ApiController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [blog_post_service_1.BlogPostService,
        portfolio_profile_service_1.PortfolioProfileService,
        portfolio_project_service_1.PortfolioProjectService])
], ApiController);
exports.ApiController = ApiController;
//# sourceMappingURL=api.controller.js.map