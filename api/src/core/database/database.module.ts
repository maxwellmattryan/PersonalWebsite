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
                    socketPath: configService.get('POSTGRES_SOCKET_PATH'),
                    port: configService.get('POSTGRES_PORT'),
                    username: configService.get('POSTGRES_USER'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DB'),
                    namingStrategy: new SnakeNamingStrategy(),
                    entities: [__dirname + '/../../features/**/*.entity{.ts,.js}'],
                    cli: {
                        'migrationsDir': 'migrations'
                    },
                    migrations: ['migrations/*{.ts,.js}'],
                    migrationsTableName: 'typeorm_migration',
                    synchronize: true
                })
            }
        })
    ]
})
export class DatabaseModule { }