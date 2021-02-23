import { Module } from '@nestjs/common';
import { MailerModule} from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailProcessor } from './mail.processor';
import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: process.env.MAILER_HOST,
                    port: process.env.MAILER_PORT,
                    secure: true,
                    auth: {
                        user: process.env.MAILER_USER,
                        pass: process.env.MAILER_PASS
                    }
                },
                defaults: {
                    from: `mattmaxwell.dev <${process.env.MAILER_USER}@gmail.com>`
                },
                template: {
                    dir: __dirname + '/templates',
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    }
                }
            })
        }),
        BullModule.registerQueue({
            name: process.env.MAILER_QUEUE_NAME,
            redis: {
                host: process.env.MAILER_QUEUE_HOST,
                port: Number(process.env.MAILER_QUEUE_PORT) || 6379
            }
        })
    ],
    exports: [
        BullModule,
        MailService
    ],
    controllers: [],
    providers: [
        MailService,
        MailProcessor
    ]
})
export class MailModule {}
