import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService, Id } from '@api/core/database/entity.service';
import { PostgresErrorCodes } from '@api/core/database/postgres-error-codes.enum';
import { InternalServerErrorException } from '@api/core/http/http.exception';

import { Admin } from '../entities/admin.entity';

import { AdminAlreadyExistsException } from '../exceptions/admin.exception';

@Injectable()
export class AdminService extends EntityService<Admin> {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>
    ) { super(); }

    public async createAdmin(adminData: Admin): Promise<Admin> {
        const admin: Admin = this.createEntity(
            this.adminRepository.create(adminData),
            ['username']
        );

        return this.adminRepository.save(admin)
            .catch((error) => {
                if(error.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
                    throw new AdminAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });
    }

    public async getById(id: Id): Promise<Admin> {
        return this.adminRepository.findOne({ id: id });
    }

    public async getByUsername(username: string): Promise<Admin> {
        return this.adminRepository.findOne({ username: username });
    }
}
