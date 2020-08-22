import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from '@api/core/auth/auth.service';

import { Admin } from './admin.entity';
import { AdminDto } from './admin.dto';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() adminData: AdminDto): Promise<Admin> {
        return this.authService.authenticateAdmin(adminData);
    }

    @Post('register')
    @HttpCode(201)
    async register(@Body() adminData: AdminDto): Promise<Admin> {
        return this.authService.registerAdmin(adminData);
    }
}