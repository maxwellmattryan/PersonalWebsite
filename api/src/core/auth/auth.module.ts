import { Module } from '@nestjs/common';

import { AdminModule } from '@api/features/admin/admin.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        AdminModule
    ],
    exports: [
        AuthService
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }