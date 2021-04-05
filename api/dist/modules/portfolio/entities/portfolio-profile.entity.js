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
exports.PortfolioProfile = void 0;
const typeorm_1 = require("typeorm");
const entity_service_1 = require("../../../core/database/entity.service");
const portfolio_profile_status_entity_1 = require("./portfolio-profile-status.entity");
const portfolio_profile_technology_entity_1 = require("./portfolio-profile-technology.entity");
const portfolio_project_entity_1 = require("./portfolio-project.entity");
let PortfolioProfile = class PortfolioProfile {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 6 }),
    __metadata("design:type", Object)
], PortfolioProfile.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => portfolio_profile_status_entity_1.PortfolioProfileStatus, ps => ps.profiles),
    __metadata("design:type", portfolio_profile_status_entity_1.PortfolioProfileStatus)
], PortfolioProfile.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany(type => portfolio_profile_technology_entity_1.PortfolioProfileTechnology, pt => pt.profile, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], PortfolioProfile.prototype, "technologies", void 0);
__decorate([
    typeorm_1.ManyToMany(type => portfolio_project_entity_1.PortfolioProject, p => p.profiles, { onDelete: 'CASCADE' }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], PortfolioProfile.prototype, "projects", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], PortfolioProfile.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], PortfolioProfile.prototype, "tagline", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], PortfolioProfile.prototype, "landing", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], PortfolioProfile.prototype, "about", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], PortfolioProfile.prototype, "image_url", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], PortfolioProfile.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' }),
    __metadata("design:type", Date)
], PortfolioProfile.prototype, "updated_at", void 0);
PortfolioProfile = __decorate([
    typeorm_1.Entity('portfolio_profile'),
    __metadata("design:paramtypes", [Object])
], PortfolioProfile);
exports.PortfolioProfile = PortfolioProfile;
//# sourceMappingURL=portfolio-profile.entity.js.map