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
exports.BlogPostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const postgres_error_codes_enum_1 = require("../../../core/database/postgres-error-codes.enum");
const http_exception_1 = require("../../../core/http/http.exception");
const blog_post_exception_1 = require("../exceptions/blog-post.exception");
const blog_post_entity_1 = require("../entities/blog-post.entity");
let BlogPostService = class BlogPostService extends entity_service_1.EntityService {
    constructor(blogPostRepository) {
        super();
        this.blogPostRepository = blogPostRepository;
    }
    async existsInTable(id) {
        return await this.blogPostRepository
            .createQueryBuilder('bp')
            .where('bp.id = :id', { id: id })
            .getCount() > 0;
    }
    async createPost(postData) {
        const post = this.createEntity(this.blogPostRepository.create(postData), ['title']);
        return this.blogPostRepository.save(post)
            .catch((error) => {
            if (error.code === postgres_error_codes_enum_1.PostgresErrorCodes.UNIQUE_VIOLATION) {
                throw new blog_post_exception_1.BlogPostAlreadyExistsException();
            }
            else {
                throw new http_exception_1.InternalServerErrorException();
            }
        });
    }
    async deletePost(id) {
        await this.blogPostRepository
            .createQueryBuilder()
            .delete()
            .from(blog_post_entity_1.BlogPost)
            .where('blog_post.id = :id', { id: id })
            .execute();
    }
    async getPost(id) {
        return this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .leftJoinAndSelect('bp.topics', 'bt')
            .where('bp.id = :id', { id: id })
            .getOne();
    }
    async getPosts() {
        return this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .orderBy('bp.updated_at', 'DESC')
            .getMany();
    }
    async getPostsByStatus(status) {
        return this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .where('bps.status = :status', { status: status })
            .orderBy('bp.updated_at', 'DESC')
            .getMany();
    }
    async getPostsByStatusAndTopic(status, topicId) {
        return this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .where('bt.id = :id', { id: topicId })
            .andWhere('bps.status = :status', { status: status })
            .orderBy('bp.updated_at', 'DESC')
            .getMany();
    }
    async getPostsByTopic(topicId) {
        return this.blogPostRepository
            .createQueryBuilder('bp')
            .leftJoinAndSelect('bp.author', 'ba')
            .leftJoinAndSelect('bp.status', 'bps')
            .innerJoinAndSelect('bp.topics', 'bt')
            .where('bt.id = :id', { id: topicId })
            .orderBy('bt.updated_at', 'DESC')
            .getMany();
    }
    async updatePost(id, postData) {
        return this.blogPostRepository.save(postData);
    }
};
BlogPostService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(blog_post_entity_1.BlogPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogPostService);
exports.BlogPostService = BlogPostService;
//# sourceMappingURL=blog-post.service.js.map