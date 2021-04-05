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
exports.PortfolioProfileController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../core/auth/jwt/jwt-auth.guard");
const entity_service_1 = require("../../../core/database/entity.service");
const portfolio_profile_entity_1 = require("../entities/portfolio-profile.entity");
const portfolio_profile_service_1 = require("../services/portfolio-profile.service");
const portfolio_profile_exception_1 = require("../exceptions/portfolio-profile.exception");
let PortfolioProfileController = class PortfolioProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getProfiles() {
        const profiles = await this.profileService.getProfiles();
        if (profiles.length == 0)
            throw new portfolio_profile_exception_1.PortfolioProfilesWereNotFoundException();
        return profiles;
    }
    async createProfile(profileData) {
        return await this.profileService.createProfile(profileData);
    }
    async updateProfile(id, profileData) {
        const profile = await this.profileService.updateProfile(id, profileData);
        if (!profile)
            throw new portfolio_profile_exception_1.PortfolioProfileCouldNotBeUpdatedException();
        return profile;
    }
    async deleteProfile(id) {
        if (!(await this.profileService.existsInTable(id)))
            throw new portfolio_profile_exception_1.PortfolioProfileWasNotFoundException();
        await this.profileService.deleteProfile(id);
    }
    async activateProfile(id) {
        if (!(await this.profileService.existsInTable(id))) {
            throw new portfolio_profile_exception_1.PortfolioProfileWasNotFoundException();
        }
        await this.profileService.resetProfileStatuses(id);
        return await this.profileService.getProfile(id);
    }
};
__decorate([
    common_1.Get(''),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PortfolioProfileController.prototype, "getProfiles", null);
__decorate([
    common_1.Post(''),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [portfolio_profile_entity_1.PortfolioProfile]),
    __metadata("design:returntype", Promise)
], PortfolioProfileController.prototype, "createProfile", null);
__decorate([
    common_1.Put(':id'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, portfolio_profile_entity_1.PortfolioProfile]),
    __metadata("design:returntype", Promise)
], PortfolioProfileController.prototype, "updateProfile", null);
__decorate([
    common_1.Delete(':id'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioProfileController.prototype, "deleteProfile", null);
__decorate([
    common_1.Put(':id/activate'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioProfileController.prototype, "activateProfile", null);
PortfolioProfileController = __decorate([
    common_1.Controller('portfolio/profiles'),
    __metadata("design:paramtypes", [portfolio_profile_service_1.PortfolioProfileService])
], PortfolioProfileController);
exports.PortfolioProfileController = PortfolioProfileController;
//# sourceMappingURL=portfolio-profile.controller.js.map