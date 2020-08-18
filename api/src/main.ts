import { NestFactory } from '@nestjs/core';

import * as morgan from 'morgan';

import { AppModule } from '@api/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn'],
    });

    app.use(morgan('tiny'));

    const PORT = 3000;
    await app.listen(PORT);
}
bootstrap();
