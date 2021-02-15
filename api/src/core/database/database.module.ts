import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from 'rxjs';

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
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASS'),
                    database: configService.get('DB_NAME'),
                    ssl: configService.get('DB_USE_SSL'),
                    extra: configService.get('DB_USE_SSL') ? { ssl: { rejectUnauthorized: false }, socketPath: configService.get('DB_SOCKET_PATH') } : { },
                    entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}']
                });
            }
        })
    ]
})
export class DatabaseModule { }