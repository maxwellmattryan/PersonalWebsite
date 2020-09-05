import { Controller, HttpCode, Post, Req, Get, UseGuards, Body } from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { NotAllowedToRegisterException, WrongCredentialsWereProvidedException } from '../exceptions/auth.exception';
import { Admin } from '@api/features/admin/entities/admin.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    @HttpCode(201)
    async register(@Req() request: Request): Promise<void> {
        throw new NotAllowedToRegisterException();
    }

    @Post('login')
    @HttpCode(200)
    async login(@Req() request: Request): Promise<Admin> {
        const admin = await this.authService.authenticateAdmin(request.body);
        if(!admin) throw new WrongCredentialsWereProvidedException();

        const jwtCookie = this.authService.generateCookieWithJwtToken(admin);
        request.res.setHeader('Set-Cookie', jwtCookie);

        return admin;
    }

    @Post('logout')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    async logout(@Req() request: Request): Promise<void> {
        request.res.clearCookie('Authentication');
    }
}