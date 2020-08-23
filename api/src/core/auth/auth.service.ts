import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { Admin } from '@api/features/admin/admin.entity';
import { AdminService } from '@api/features/admin/admin.service';

import { WrongCredentialsProvidedException } from './auth.exception';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    public async generateCookieWithJwtToken(username: string): Promise<string> {
        const payload: TokenPayload = { username };

        const token = this.jwtService.sign(payload);
        const expirationTime = this.configService.get('JWT_EXPIRATION_TIME')

        return `Authentication=${token}; HttpOnly; Secure; Path=/; Max-Age=${expirationTime}`;
    }

    public async generateEmptyCookie(): Promise<string> {
        return 'Authentication=; HttpOnly; Secure; Path=/; Max-Age=0';
    }

    public async authenticateAdmin(adminData: Admin): Promise<Admin> {
        const admin = await this.adminService.getByUsername(adminData.username);

        if(!(await bcrypt.compare(adminData.password, admin.password))) {
            throw new WrongCredentialsProvidedException();
        } else {
            return admin;
        }
    }

    public async registerAdmin(adminData: Admin): Promise<Admin> {
        const passwordHash = await bcrypt.hash(adminData.password, 10);

        return await this.adminService.createAdmin({ ...adminData, password: passwordHash });
    }
}