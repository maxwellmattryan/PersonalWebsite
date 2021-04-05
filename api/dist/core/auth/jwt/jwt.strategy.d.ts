import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { Admin } from '@api/modules/admin/entities/admin.entity';
import { AdminService } from '@api/modules/admin/services/admin.service';
import { TokenPayload } from '../interfaces/token-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly adminService;
    constructor(configService: ConfigService, adminService: AdminService);
    validate(payload: TokenPayload): Promise<Admin>;
}
export {};
