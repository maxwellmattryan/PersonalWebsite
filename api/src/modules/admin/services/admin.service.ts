import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';
import { AdminAlreadyExistsException } from '../exceptions/admin.exception';

import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>
    ) { }

    public async createAdmin(adminData: Admin): Promise<Admin> {
        const admin: Admin = this.adminRepository.create(adminData);

        return await this.adminRepository.save(admin)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
                    throw new AdminAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });
    }

    public async getById(id: number): Promise<Admin> {
        return await this.adminRepository.findOne({ id: id });
    }

    public async getByUsername(username: string): Promise<Admin> {
        return await this.adminRepository.findOne({ username: username });
    }
}
