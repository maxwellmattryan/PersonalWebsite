import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { Admin } from '@api/features/admin/entities/admin.entity';
import { AdminService } from '@api/features/admin/services/admin.service';

import { TokenPayload } from '../interfaces/token-payload.interface';

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

        // CAUTION: When trying to include the 'Secure;' option, HTTPS has to be used
        // NOTE: Cookie just disappears from client-side storage on the first request's sent after it expires
        return `Authentication=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${expiresIn}`;
    }
}