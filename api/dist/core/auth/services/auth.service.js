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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const admin_entity_1 = require("../../../modules/admin/entities/admin.entity");
const admin_service_1 = require("../../../modules/admin/services/admin.service");
let AuthService = class AuthService {
    constructor(adminService, jwtService, configService) {
        this.adminService = adminService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async registerAdmin(adminData) {
        const passwordHash = await bcrypt.hash(adminData.password, 10);
        return this.adminService.createAdmin(Object.assign(Object.assign({}, adminData), { password: passwordHash }));
    }
    async authenticateAdmin(adminData) {
        const admin = await this.adminService.getByUsername(adminData.username);
        if (admin && await bcrypt.compare(adminData.password, admin.password)) {
            return admin;
        }
        else {
            return;
        }
    }
    generateCookieWithJwtToken(admin) {
        const payload = { id: admin.id, username: admin.username };
        const token = this.jwtService.sign(payload);
        const expiresIn = this.configService.get('JWT_EXPIRES_IN');
        return `Authentication=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${expiresIn}`;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map