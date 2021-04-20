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
                const isLocal: boolean = Boolean(configService.get('DB_HOST') === 'localhost');
                const extraOptions = isLocal ? { } : { ssl: { rejectUnauthorized: false }};

                return ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASS'),
                    database: configService.get('DB_NAME'),
                    extra: extraOptions,
                    entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
                    namingStrategy: new SnakeNamingStrategy(),
                    synchronize: true,
                    keepConnectionAlive: true
                });
            }
        })
    ]
})
export class DatabaseModule { }