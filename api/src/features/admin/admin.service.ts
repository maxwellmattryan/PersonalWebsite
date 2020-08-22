import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCode } from '@api/core/database/postgres-error-code.enum';

import { Admin } from './admin.entity';
import { AdminDto } from './admin.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>
    ) { }

    public async createAdmin(adminData: AdminDto): Promise<Admin> {
        const admin: Admin = await this.adminRepository.create(adminData)

        await this.adminRepository.save(admin)
            .catch((error) => {
                if(error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
                    throw new HttpException('Admin with that username already exists', HttpStatus.BAD_REQUEST);
                } else {
                    throw new HttpException('Oops! Something went wrong', HttpStatus.BAD_REQUEST);
                }
            });

        return admin;
    }

    public async getByUsername(username: string): Promise<Admin> {
        const admin = await this.adminRepository.findOne({ username: username });

        if(!admin) {
            throw new HttpException('Admin with that username does not exist', HttpStatus.NOT_FOUND);
        } else {
            return admin;
        }
    }
}
