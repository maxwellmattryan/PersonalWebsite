import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { join } from 'path';

import { AppModule } from '@api/app.module';
import { HttpLoggingInterceptor } from '@api/core/http/http-logging.interceptor';

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

    app.use(cookieParser(process.env.JWT_SECRET));

    app.useGlobalInterceptors(new HttpLoggingInterceptor());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(
        app.get(Reflector)
    ));

    app.use(compression());

    app.useStaticAssets(join(__dirname, '..', 'assets'));

    app.setGlobalPrefix('api');

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
}

bootstrap();
