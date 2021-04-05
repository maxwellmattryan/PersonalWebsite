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
exports.PortfolioProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const postgres_error_codes_enum_1 = require("../../../core/database/postgres-error-codes.enum");
const http_exception_1 = require("../../../core/http/http.exception");
const portfolio_profile_entity_1 = require("../entities/portfolio-profile.entity");
const portfolio_profile_status_service_1 = require("./portfolio-profile-status.service");
const portfolio_profile_technology_service_1 = require("./portfolio-profile-technology.service");
const portfolio_profile_exception_1 = require("../exceptions/portfolio-profile.exception");
let PortfolioProfileService = class PortfolioProfileService extends entity_service_1.EntityService {
    constructor(portfolioProfileRepository, portfolioProfileStatusService, portfolioProfileTechnologyService) {
        super();
        this.portfolioProfileRepository = portfolioProfileRepository;
        this.portfolioProfileStatusService = portfolioProfileStatusService;
        this.portfolioProfileTechnologyService = portfolioProfileTechnologyService;
    }
    async existsInTable(id) {
        return await this.portfolioProfileRepository
            .createQueryBuilder('p')
            .where(`p.id = :id`, { id: id })
            .getCount() > 0;
    }
    async createProfile(profileData) {
        const profile = this.createEntity(this.portfolioProfileRepository.create(profileData), ['name']);
        profile.technologies = profile.technologies.map(t => this.portfolioProfileTechnologyService.createEntity(t, ['name']));
        if (profile.status.status === 'ACTIVE')
            await this.resetProfileStatuses(profile.id);
        return this.portfolioProfileRepository.save(profile)
            .catch((error) => {
            if (error.code === postgres_error_codes_enum_1.PostgresErrorCodes.UNIQUE_VIOLATION) {
                throw new portfolio_profile_exception_1.PortfolioProfileAlreadyExistsException();
            }
            else {
                throw new http_exception_1.InternalServerErrorException();
            }
        });
    }
    async deleteProfile(id) {
        if (id == (await this.getProfileByStatus('ACTIVE')).id) {
            await this.resetProfileStatuses((await this.getProfileByStatus('INACTIVE')).id);
        }
        await this.portfolioProfileTechnologyService.deleteTechnologies(id);
        await this.portfolioProfileRepository
            .createQueryBuilder()
            .delete()
            .from(portfolio_profile_entity_1.PortfolioProfile)
            .where('portfolio_profile.id = :id', { id: id })
            .execute();
    }
    async getProfile(id) {
        return this.portfolioProfileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.technologies', 'pt')
            .leftJoinAndSelect('p.projects', 'prj')
            .leftJoinAndSelect('p.status', 'ps')
            .where('p.id = :id', { id: id })
            .getOne();
    }
    async getProfileByStatus(status) {
        return this.portfolioProfileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.technologies', 'pt')
            .leftJoinAndSelect('p.status', 'ps')
            .leftJoinAndSelect('p.projects', 'prj')
            .where('ps.status = :status', { status: status })
            .getOne();
    }
    async getProfiles() {
        return this.portfolioProfileRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.projects', 'prj')
            .leftJoinAndSelect('p.technologies', 'pt')
            .leftJoinAndSelect('p.status', 'ps')
            .getMany();
    }
    async resetProfileStatuses(activeId) {
        await this.portfolioProfileRepository.query(`
            UPDATE portfolio_profile
            SET status_id = CASE WHEN id = '${activeId}' THEN '9CI7WO' ELSE 'G3SU5I' END,
                updated_at = now();
        `);
    }
    async updateProfile(id, profileData) {
        const activeProfile = await this.getProfileByStatus('ACTIVE');
        if (id === activeProfile.id) {
            if (profileData.status.status === 'INACTIVE') {
                await this.resetProfileStatuses((await this.getProfileByStatus('INACTIVE')).id);
            }
        }
        else {
            if (profileData.status.status === 'ACTIVE') {
                await this.resetProfileStatuses(id);
            }
        }
        await this.portfolioProfileTechnologyService.deleteTechnologies(id);
        await this.portfolioProfileTechnologyService.createTechnologies(profileData.technologies, id);
        const technologies = await this.portfolioProfileTechnologyService.getTechnologies(id);
        return this.portfolioProfileRepository.save(new portfolio_profile_entity_1.PortfolioProfile(Object.assign(Object.assign({}, profileData), { technologies: technologies })));
    }
};
PortfolioProfileService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(portfolio_profile_entity_1.PortfolioProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        portfolio_profile_status_service_1.PortfolioProfileStatusService,
        portfolio_profile_technology_service_1.PortfolioProfileTechnologyService])
], PortfolioProfileService);
exports.PortfolioProfileService = PortfolioProfileService;
//# sourceMappingURL=portfolio-profile.service.js.map