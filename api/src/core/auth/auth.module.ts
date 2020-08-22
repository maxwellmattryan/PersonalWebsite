import { Module, forwardRef } from '@nestjs/common';

import { AdminModule } from '@api/features/admin/admin.module';

import { AuthService } from './auth.service';

@Module({
    imports: [
        forwardRef(() => AdminModule)
    ],
    exports: [
        AuthService
    ],
    controllers: [],
    providers: [
        AuthService
    ]
})
export class AuthModule { }