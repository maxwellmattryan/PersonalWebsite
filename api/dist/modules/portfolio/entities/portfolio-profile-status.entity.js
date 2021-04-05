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
exports.PortfolioProfileStatus = void 0;
const typeorm_1 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const portfolio_profile_entity_1 = require("./portfolio-profile.entity");
let PortfolioProfileStatus = class PortfolioProfileStatus {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 6 }),
    __metadata("design:type", Object)
], PortfolioProfileStatus.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], PortfolioProfileStatus.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany(type => portfolio_profile_entity_1.PortfolioProfile, p => p.status),
    __metadata("design:type", Array)
], PortfolioProfileStatus.prototype, "profiles", void 0);
PortfolioProfileStatus = __decorate([
    typeorm_1.Entity('portfolio_profile_status'),
    __metadata("design:paramtypes", [Object])
], PortfolioProfileStatus);
exports.PortfolioProfileStatus = PortfolioProfileStatus;
//# sourceMappingURL=portfolio-profile-status.entity.js.map