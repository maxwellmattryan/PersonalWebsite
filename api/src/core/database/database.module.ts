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
                const socketPath = configService.get('DB_SOCKET_PATH');
                const extra = socketPath ? {
                    socketPath: socketPath,
                    ssl: {
                        rejectUnauthorized: false,
                        ca: Buffer.from(process.env.DB_SSL_CA, 'base64').toString('ascii'),
                        cert: Buffer.from(process.env.DB_SSL_CERT, 'base64').toString('ascii'),
                        key: Buffer.from(process.env.DB_SSL_KEY, 'base64').toString('ascii'),
                    }
                } : { };

                return ({
                    type: 'postgres',
                    host: socketPath || configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASS'),
                    database: configService.get('DB_NAME'),
                    extra: extra,
                    entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
                    namingStrategy: new SnakeNamingStrategy(),
                    synchronize: true,
                });
            }
        })
    ]
})
export class DatabaseModule { }