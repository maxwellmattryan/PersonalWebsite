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
exports.PortfolioProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const postgres_error_codes_enum_1 = require("../../../core/database/postgres-error-codes.enum");
const http_exception_1 = require("../../../core/http/http.exception");
const portfolio_project_entity_1 = require("../entities/portfolio-project.entity");
const portfolio_project_exception_1 = require("../exceptions/portfolio-project.exception");
let PortfolioProjectService = class PortfolioProjectService extends entity_service_1.EntityService {
    constructor(portfolioProjectRepository) {
        super();
        this.portfolioProjectRepository = portfolioProjectRepository;
    }
    async existsInTable(id) {
        return await this.portfolioProjectRepository
            .createQueryBuilder('p')
            .where('p.id = :id', { id: id })
            .getCount() > 0;
    }
    async createProject(projectData) {
        const project = this.createEntity(this.portfolioProjectRepository.create(projectData), ['name']);
        return this.portfolioProjectRepository.save(project)
            .catch((error) => {
            if (error.code === postgres_error_codes_enum_1.PostgresErrorCodes.UNIQUE_VIOLATION) {
                throw new portfolio_project_exception_1.PortfolioProjectAlreadyExistsException();
            }
            else {
                throw new http_exception_1.InternalServerErrorException();
            }
        });
    }
    async deleteProject(id) {
        await this.portfolioProjectRepository
            .createQueryBuilder()
            .delete()
            .from(portfolio_project_entity_1.PortfolioProject)
            .where('portfolio_project.id = :id', { id: id })
            .execute();
    }
    async getProject(id) {
        return this.portfolioProjectRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.profiles', 'prf')
            .where('p.id = :id', { id: id })
            .getOne();
    }
    async getProjects() {
        return this.portfolioProjectRepository
            .createQueryBuilder('p')
            .getMany();
    }
    async getProjectsForProfile(profileId) {
        return this.portfolioProjectRepository
            .createQueryBuilder('p')
            .innerJoinAndSelect('p.profiles', 'prf')
            .where('prf.id = :id', { id: profileId })
            .getMany();
    }
    async updateProject(id, projectData) {
        return this.portfolioProjectRepository.save(projectData);
    }
};
PortfolioProjectService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(portfolio_project_entity_1.PortfolioProject)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PortfolioProjectService);
exports.PortfolioProjectService = PortfolioProjectService;
//# sourceMappingURL=portfolio-project.service.js.map