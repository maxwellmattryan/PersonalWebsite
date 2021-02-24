import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ShopMailerService {
    constructor(
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService
    ) { }

    public sendTest(): void {
        this.mailerService.sendMail({
            to: 'maxwellmattryan@gmail.com',
            from: `${this.configService.get('MAILER_USER')}@gmail.com`,
            subject: 'Testing NestJS Mailer Module',
            text: 'Hello!',
            html: `<br>Hello!</br>`
        })
        .then(() => { })
        .catch((err) => { console.log(err); })
    }
}