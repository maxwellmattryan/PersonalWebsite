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
exports.PortfolioProfileStatusController = void 0;
const portfolio_profile_status_service_1 = require("../services/portfolio-profile-status.service");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../core/auth/jwt/jwt-auth.guard");
const portfolio_profile_status_exception_1 = require("../exceptions/portfolio-profile-status.exception");
let PortfolioProfileStatusController = class PortfolioProfileStatusController {
    constructor(profileStatusService) {
        this.profileStatusService = profileStatusService;
    }
    async getProfileStatuses() {
        const statuses = await this.profileStatusService.getStatuses();
        if (statuses.length === 0)
            throw new portfolio_profile_status_exception_1.PortfolioProfileStatusesWereNotFoundException();
        return statuses;
    }
};
__decorate([
    common_1.Get(''),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PortfolioProfileStatusController.prototype, "getProfileStatuses", null);
PortfolioProfileStatusController = __decorate([
    common_1.Controller('portfolio/profile-statuses'),
    __metadata("design:paramtypes", [portfolio_profile_status_service_1.PortfolioProfileStatusService])
], PortfolioProfileStatusController);
exports.PortfolioProfileStatusController = PortfolioProfileStatusController;
//# sourceMappingURL=portfolio-profile-status.controller.js.map