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
exports.PortfolioProfileTechnologyController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../core/auth/jwt/jwt-auth.guard");
const portfolio_profile_technology_service_1 = require("../services/portfolio-profile-technology.service");
const portfolio_profile_technology_exception_1 = require("../exceptions/portfolio-profile-technology.exception");
let PortfolioProfileTechnologyController = class PortfolioProfileTechnologyController {
    constructor(profileTechnologyService) {
        this.profileTechnologyService = profileTechnologyService;
    }
    async getProfileTechnologies(id) {
        const technologies = await this.profileTechnologyService.getTechnologies(id);
        if (technologies.length === 0)
            throw new portfolio_profile_technology_exception_1.PortfolioProfileTechnologiesWereNotFoundException();
        return technologies;
    }
};
__decorate([
    common_1.Get(''),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PortfolioProfileTechnologyController.prototype, "getProfileTechnologies", null);
PortfolioProfileTechnologyController = __decorate([
    common_1.Controller('portfolio/profiles/:id/technologies'),
    __metadata("design:paramtypes", [portfolio_profile_technology_service_1.PortfolioProfileTechnologyService])
], PortfolioProfileTechnologyController);
exports.PortfolioProfileTechnologyController = PortfolioProfileTechnologyController;
//# sourceMappingURL=portfolio-profile-technology.controller.js.map