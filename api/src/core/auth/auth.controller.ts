import { Controller, HttpCode, Post, Req, Get, UseGuards, Body } from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { WrongCredentialsWereProvidedException } from './auth.exception';
import { Admin } from '@api/features/admin/admin.entity';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    @HttpCode(201)
    async register(@Req() request: Request): Promise<Admin> {
        return await this.authService.registerAdmin(request.body);
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

    @Get('test')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async test(@Req() request: Request): Promise<void> { }
}