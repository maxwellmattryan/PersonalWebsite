import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '@api/app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['log', 'error', 'warn'],
    });

    app.enableCors({
        origin: true,
        methods: 'GET,POST,PUT,DELETE,BATCH,OPTIONS',
        credentials: true
    });

    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    }));

    app.use(helmet());

    app.use(morgan('tiny'));
    app.use(cookieParser());

    app.useGlobalInterceptors(new ClassSerializerInterceptor(
        app.get(Reflector)
    ));

    const PORT = 3000;
    await app.listen(PORT);
}

bootstrap();