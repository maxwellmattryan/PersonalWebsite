import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PostgresErrorCode } from '@api/core/database/postgres-error-code.enum';

import { Admin } from '@api/features/admin/admin.entity';
import { AdminDto } from '@api/features/admin/admin.dto';
import { AdminService } from '@api/features/admin/admin.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService
    ) { }

    public async authenticateAdmin(adminData: AdminDto): Promise<Admin> {
        const admin = await this.adminService.getByUsername(adminData.username);

        if(!(await this.isValidPassword(adminData.password, admin.password))) {
            throw new HttpException('The wrong credentials were provided.', HttpStatus.BAD_REQUEST);
        } else {
            admin.password = undefined;

            return admin;
        }
    }

    private async isValidPassword(rawPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(rawPassword, hashedPassword);
    }

    public async registerAdmin(adminData: AdminDto): Promise<Admin> {
        const passwordHash = await bcrypt.hash(adminData.password, 10);

        const admin = await this.adminService.createAdmin({ ...adminData, password: passwordHash })
        admin.password = undefined;

        return admin;
    }
}