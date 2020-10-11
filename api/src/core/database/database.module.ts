import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return ({
                    type: 'postgres',
                    namingStrategy: new SnakeNamingStrategy(),
                    synchronize: true,
                    url: configService.get('DATABASE_URL'),
                    ssl: configService.get('DATABASE_USE_SSL'),
                    extra: configService.get('DATABASE_USE_SSL') ? { ssl: { rejectUnauthorized: false } } : { },
                    entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}']
                });
            }
        })
    ]
})
export class DatabaseModule { }