import { Response } from 'express';
import { Admin } from '@api/modules/admin/entities/admin.entity';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(adminData: Admin): Promise<Admin>;
    login(adminData: Admin, response: Response): Promise<void>;
    logout(response: Response): Promise<void>;
}
