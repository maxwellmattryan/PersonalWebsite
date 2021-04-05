import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@api/modules/admin/entities/admin.entity';
import { AdminService } from '@api/modules/admin/services/admin.service';
export declare class AuthService {
    private readonly adminService;
    private readonly jwtService;
    private readonly configService;
    constructor(adminService: AdminService, jwtService: JwtService, configService: ConfigService);
    registerAdmin(adminData: Admin): Promise<Admin>;
    authenticateAdmin(adminData: Admin): Promise<Admin>;
    generateCookieWithJwtToken(admin: Admin): string;
}
