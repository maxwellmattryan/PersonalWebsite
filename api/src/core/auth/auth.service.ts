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

    public async register(adminData: AdminDto) {
        const passwordHash = await bcrypt.hash(adminData.password, 10);
        try {
            const newAdmin: Admin = await this.adminService.create({
                ...adminData,
                password: passwordHash
            });

            newAdmin.password = undefined;

            return newAdmin;
        } catch(error) {
            if(error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
                throw new HttpException('Admin with that username already exists', HttpStatus.BAD_REQUEST);
            }

            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}