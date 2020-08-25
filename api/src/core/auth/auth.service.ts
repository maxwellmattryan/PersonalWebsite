import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { Admin } from '@api/features/admin/admin.entity';
import { AdminService } from '@api/features/admin/admin.service';

import { JwtToken } from './interfaces/jwt-token.interface';
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

    public generateJwtToken(adminId: number): JwtToken {
        const payload: TokenPayload = { adminId };

        const expirationTime = this.configService.get('JWT_EXPIRES_IN');
        const token = this.jwtService.sign(payload, { expiresIn: expirationTime });

        return { signature: token, expiresIn: expirationTime };
    }
}