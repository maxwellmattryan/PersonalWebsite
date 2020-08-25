import { Controller, HttpCode, Post, Req, Get, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @HttpCode(200)
    async login(@Req() request: Request) {
        // authenticate the data in the request body (throw wrong credentials exception if not provided)
        // create jwt token and embed into HttpOnly cookie (in auth service)
        // return admin data (id and username)
        console.log(request.body);
        return '';
    }

    @Post('logout')
    @HttpCode(200)
    async logout(@Req() request: Request) { }

    @Get('test')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async test(@Req() request: Request) {
        return 'You passed the auth guard!';
    }
}