"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const portfolio_profile_controller_1 = require("./controllers/portfolio-profile.controller");
const portfolio_profile_status_controller_1 = require("./controllers/portfolio-profile-status.controller");
const portfolio_profile_technology_controller_1 = require("./controllers/portfolio-profile-technology.controller");
const portfolio_project_controller_1 = require("./controllers/portfolio-project.controller");
const portfolio_profile_entity_1 = require("./entities/portfolio-profile.entity");
const portfolio_profile_status_entity_1 = require("./entities/portfolio-profile-status.entity");
const portfolio_profile_technology_entity_1 = require("./entities/portfolio-profile-technology.entity");
const portfolio_project_entity_1 = require("./entities/portfolio-project.entity");
const portfolio_profile_service_1 = require("./services/portfolio-profile.service");
const portfolio_profile_status_service_1 = require("./services/portfolio-profile-status.service");
const portfolio_profile_technology_service_1 = require("./services/portfolio-profile-technology.service");
const portfolio_project_service_1 = require("./services/portfolio-project.service");
let PortfolioModule = class PortfolioModule {
};
PortfolioModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([portfolio_profile_entity_1.PortfolioProfile, portfolio_profile_status_entity_1.PortfolioProfileStatus, portfolio_profile_technology_entity_1.PortfolioProfileTechnology, portfolio_project_entity_1.PortfolioProject])
        ],
        exports: [
            portfolio_profile_service_1.PortfolioProfileService,
            portfolio_profile_status_service_1.PortfolioProfileStatusService,
            portfolio_profile_technology_service_1.PortfolioProfileTechnologyService,
            portfolio_project_service_1.PortfolioProjectService
        ],
        controllers: [
            portfolio_profile_controller_1.PortfolioProfileController,
            portfolio_profile_status_controller_1.PortfolioProfileStatusController,
            portfolio_profile_technology_controller_1.PortfolioProfileTechnologyController,
            portfolio_project_controller_1.PortfolioProjectController
        ],
        providers: [
            portfolio_profile_service_1.PortfolioProfileService,
            portfolio_profile_status_service_1.PortfolioProfileStatusService,
            portfolio_profile_technology_service_1.PortfolioProfileTechnologyService,
            portfolio_project_service_1.PortfolioProjectService
        ]
    })
], PortfolioModule);
exports.PortfolioModule = PortfolioModule;
//# sourceMappingURL=portfolio.module.js.map