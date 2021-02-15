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
                    ca: Buffer.from(process.env.SSL_CA, 'base64').toString('ascii'),
                    cert: Buffer.from(process.env.SSL_CERT, 'base64').toString('ascii'),
                    key: Buffer.from(process.env.SSL_KEY, 'base64').toString('ascii'),
                } : { }

                return ({
                    type: 'postgres',
                    namingStrategy: new SnakeNamingStrategy(),
                    synchronize: true,
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASS'),
                    database: configService.get('DB_NAME'),
                    extra: configService.get('DB_SOCKET_PATH') ? {
                        socketPath: configService.get('DB_SOCKET_PATH'),
                        ssl: sslOptions
                    } : {
                        ssl: sslOptions
                    },
                    entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}']
                });
            }
        })
    ]
})
export class DatabaseModule { }