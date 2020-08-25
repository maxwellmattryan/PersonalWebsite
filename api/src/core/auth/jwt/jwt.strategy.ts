import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { Request } from 'express';

import { Admin } from '@api/features/admin/admin.entity'
import { AdminService } from '@api/features/admin/admin.service';

import { TokenPayload } from '../interfaces/token-payload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly adminService: AdminService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate(payload: TokenPayload): Promise<Admin> {
        return this.adminService.getById(payload.adminId);
    }
}