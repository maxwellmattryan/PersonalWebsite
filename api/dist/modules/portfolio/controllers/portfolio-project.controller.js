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
exports.PortfolioProjectController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../core/auth/jwt/jwt-auth.guard");
const entity_service_1 = require("../../../core/database/entity.service");
const portfolio_profile_service_1 = require("../services/portfolio-profile.service");
const portfolio_project_entity_1 = require("../entities/portfolio-project.entity");
const portfolio_project_service_1 = require("../services/portfolio-project.service");
const portfolio_project_exception_1 = require("../exceptions/portfolio-project.exception");
let PortfolioProjectController = class PortfolioProjectController {
    constructor(profileService, projectService) {
        this.profileService = profileService;
        this.projectService = projectService;
    }
    async getProjects() {
        const projects = await this.projectService.getProjects();
        if (projects.length === 0)
            throw new portfolio_project_exception_1.PortfolioProjectsWereNotFoundException();
        return projects;
    }
    async createProject(projectData) {
        return this.projectService.createProject(projectData);
    }
    async getProject(id) {
        const project = await this.projectService.getProject(id);
        if (!project)
            throw new portfolio_project_exception_1.PortfolioProjectWasNotFoundException();
        return project;
    }
    async updateProject(id, projectData) {
        const project = await this.projectService.updateProject(id, projectData);
        if (!project)
            throw new portfolio_project_exception_1.PortfolioProjectCouldNotBeUpdatedException();
        return project;
    }
    async deleteProject(id) {
        if (!(await this.projectService.existsInTable(id)))
            throw new portfolio_project_exception_1.PortfolioProjectWasNotFoundException();
        await this.projectService.deleteProject(id);
    }
};
__decorate([
    common_1.Get(''),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PortfolioProjectController.prototype, "getProjects", null);
__decorate([
    common_1.Post(''),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [portfolio_project_entity_1.PortfolioProject]),
    __metadata("design:returntype", Promise)
], PortfolioProjectController.prototype, "createProject", null);
__decorate([
    common_1.Get(':id'),
    common_1.HttpCode(200),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioProjectController.prototype, "getProject", null);
__decorate([
    common_1.Put(':id'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, portfolio_project_entity_1.PortfolioProject]),
    __metadata("design:returntype", Promise)
], PortfolioProjectController.prototype, "updateProject", null);
__decorate([
    common_1.Delete(':id'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioProjectController.prototype, "deleteProject", null);
PortfolioProjectController = __decorate([
    common_1.Controller('portfolio/projects'),
    __metadata("design:paramtypes", [portfolio_profile_service_1.PortfolioProfileService,
        portfolio_project_service_1.PortfolioProjectService])
], PortfolioProjectController);
exports.PortfolioProjectController = PortfolioProjectController;
//# sourceMappingURL=portfolio-project.controller.js.map