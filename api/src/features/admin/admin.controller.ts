import { Controller, HttpCode, UseGuards, Get, Post, Req, Res } from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from '@api/core/auth/auth.service';
import { JwtAuthGuard } from '@api/core/auth/jwt-auth.guard';

import { Admin } from './admin.entity';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    @HttpCode(200)
    async login(@Req() request: Request): Promise<Admin> {
        const admin: Admin = await this.authService.authenticateAdmin(request.body);

        const cookie = await this.authService.generateCookieWithJwtToken(admin.username);
        request.res.setHeader('Set-Cookie', cookie);

        return admin;
    }

    @Post('logout')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async logout(@Req() request: Request) {
        const cookie = await this.authService.generateEmptyCookie();
        request.res.setHeader('Set-Cookie', cookie);

        request.res.send('Successfully logged out admin!');
    }

    @Post('register')
    @HttpCode(201)
    async register(@Req() request: Request): Promise<Admin> {
        return await this.authService.registerAdmin(request.body);
    }
}