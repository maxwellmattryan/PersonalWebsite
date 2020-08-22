import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@api/core/auth/auth.module';

import { Admin } from './admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([Admin])
    ],
    exports: [
        AdminService
    ],
    controllers: [
        AdminController
    ],
    providers: [
        AdminService
    ]
})
export class AdminModule { }
