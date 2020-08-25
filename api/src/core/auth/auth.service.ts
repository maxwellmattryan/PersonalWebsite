import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { Admin } from '@api/features/admin/admin.entity';
import { AdminService } from '@api/features/admin/admin.service';

import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    public async registerAdmin(adminData: Admin): Promise<Admin> {
        const passwordHash = await bcrypt.hash(adminData.password, 10);

        return await this.adminService.createAdmin({ ...adminData, password: passwordHash });
    }

    public async authenticateAdmin(adminData: Admin): Promise<Admin> {
        const admin: Admin = await this.adminService.getByUsername(adminData.username);

        if(admin && await bcrypt.compare(adminData.password, admin.password)) {
            return admin;
        } else {
            return;
        }
    }

    public generateCookieWithJwtToken(admin: Admin): string {
        const payload: TokenPayload = { adminId: admin.id, username: admin.username };
        const token = this.jwtService.sign(payload);
        const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');

        // CAUTION: When trying to include the 'Secure' field, the cookie was not being set on client side
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn}`;
    }
}