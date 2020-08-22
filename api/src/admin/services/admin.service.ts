import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateAdminDto } from '../dto/create-admin.dto';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>
    ) { }

    public async getByUsername(username: string): Promise<Admin> {
        const admin = await this.adminRepository.findOne({ username: username })

        if(admin) {
            return admin;
        } else {
            throw new HttpException(`Admin with username of ${username} does not exist`, HttpStatus.NOT_FOUND)
        }
    }

    public async create(adminData: CreateAdminDto) {
        const newAdmin = await this.adminRepository.create(adminData);

        await this.adminRepository.save(newAdmin);

        return newAdmin;
    }
}
