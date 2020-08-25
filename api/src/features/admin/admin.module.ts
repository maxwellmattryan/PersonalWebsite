import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from './admin.entity';
import { AdminService } from './admin.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin])
    ],
    exports: [
        AdminService
    ],
    controllers: [
    ],
    providers: [
        AdminService
    ]
})
export class AdminModule { }
