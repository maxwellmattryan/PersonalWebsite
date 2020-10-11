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
                    extra: configService.get('POSTGRES_USE_SSL') ? { ssl: { rejectUnauthorized: false } } : { },
                    ssl: configService.get('POSTGRES_USE_SSL') || false,
                    host: configService.get('POSTGRES_SOCKET_PATH') || configService.get('POSTGRES_HOST'),
                    port: configService.get('POSTGRES_PORT'),
                    username: configService.get('POSTGRES_USER'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DB'),
                    namingStrategy: new SnakeNamingStrategy(),
                    entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
                    synchronize: true
                });
            }
        })
    ]
})
export class DatabaseModule { }