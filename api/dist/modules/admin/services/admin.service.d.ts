import { Repository } from 'typeorm';
import { EntityService, Id } from '@api/core/database/entity.service';
import { Admin } from '../entities/admin.entity';
export declare class AdminService extends EntityService<Admin> {
    private readonly adminRepository;
    constructor(adminRepository: Repository<Admin>);
    createAdmin(adminData: Admin): Promise<Admin>;
    getById(id: Id): Promise<Admin>;
    getByUsername(username: string): Promise<Admin>;
}
