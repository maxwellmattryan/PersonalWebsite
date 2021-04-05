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
exports.BlogTopicService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const postgres_error_codes_enum_1 = require("../../../core/database/postgres-error-codes.enum");
const http_exception_1 = require("../../../core/http/http.exception");
const blog_topic_entity_1 = require("../entities/blog-topic.entity");
const blog_topic_exception_1 = require("../exceptions/blog-topic.exception");
let BlogTopicService = class BlogTopicService extends entity_service_1.EntityService {
    constructor(blogTopicRepository) {
        super();
        this.blogTopicRepository = blogTopicRepository;
    }
    async existsInTable(id) {
        return await this.blogTopicRepository
            .createQueryBuilder('bt')
            .where('bt.id = :id', { id: id })
            .getCount() > 0;
    }
    async createTopic(topicData) {
        const topic = this.createEntity(this.blogTopicRepository.create(topicData), ['name']);
        return this.blogTopicRepository.save(topic).catch((error) => {
            if (error.code === postgres_error_codes_enum_1.PostgresErrorCodes.UNIQUE_VIOLATION) {
                throw new blog_topic_exception_1.BlogTopicAlreadyExistsException();
            }
            else {
                throw new http_exception_1.InternalServerErrorException();
            }
        });
    }
    async deleteTopic(id) {
        await this.blogTopicRepository
            .createQueryBuilder()
            .delete()
            .from(blog_topic_entity_1.BlogTopic)
            .where('blog_topic.id = :id', { id: id })
            .execute();
    }
    async getTopic(id) {
        return this.blogTopicRepository
            .createQueryBuilder('bt')
            .where('bt.id = :id', { id: id })
            .getOne();
    }
    async getTopics() {
        return this.blogTopicRepository
            .createQueryBuilder('bt')
            .orderBy('bt.name', 'ASC')
            .getMany();
    }
    async updateTopic(id, topicData) {
        return this.blogTopicRepository.save(topicData);
    }
};
BlogTopicService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(blog_topic_entity_1.BlogTopic)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogTopicService);
exports.BlogTopicService = BlogTopicService;
//# sourceMappingURL=blog-topic.service.js.map