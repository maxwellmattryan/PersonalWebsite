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
exports.BlogPostStatusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const blog_post_status_entity_1 = require("../entities/blog-post-status.entity");
let BlogPostStatusService = class BlogPostStatusService extends entity_service_1.EntityService {
    constructor(blogPostStatusRepository) {
        super();
        this.blogPostStatusRepository = blogPostStatusRepository;
    }
    async getStatuses() {
        return this.blogPostStatusRepository
            .createQueryBuilder('bps')
            .getMany();
    }
};
BlogPostStatusService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(blog_post_status_entity_1.BlogPostStatus)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogPostStatusService);
exports.BlogPostStatusService = BlogPostStatusService;
//# sourceMappingURL=blog-post-status.service.js.map