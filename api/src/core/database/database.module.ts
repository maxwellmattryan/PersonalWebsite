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
                const sslOptions = configService.get('DB_USE_SSL') ? {
                    rejectUnauthorized: false,
                    ca: Buffer.from(process.env.DB_SSL_CA, 'base64').toString('ascii'),
                    cert: Buffer.from(process.env.DB_SSL_CERT, 'base64').toString('ascii'),
                    key: Buffer.from(process.env.DB_SSL_KEY, 'base64').toString('ascii'),
                } : { }

                const extraOptions = configService.get('DB_SOCKET_PATH') ? {
                    socketPath: configService.get('DB_SOCKET_PATH'),
                    ssl: sslOptions
                } : { };

                return ({
                    type: 'postgres',
                    namingStrategy: new SnakeNamingStrategy(),
                    synchronize: true,
                    host: configService.get('DB_SOCKET_PATH') || configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASS'),
                    database: configService.get('DB_NAME'),
                    extra: extraOptions,
                    entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}']
                });
            }
        })
    ]
})
export class DatabaseModule { }