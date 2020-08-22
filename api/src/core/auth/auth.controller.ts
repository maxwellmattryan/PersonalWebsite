import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AdminDto } from '@api/features/admin/admin.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('')
    @HttpCode(201)
    async register(@Body() adminData: AdminDto) {
        return this.authService.register(adminData);
    }
}