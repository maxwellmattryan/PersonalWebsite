import { Strategy } from 'passport-local';
import { Admin } from '@api/modules/admin/entities/admin.entity';
import { AuthService } from '../services/auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<Admin>;
}
export {};
