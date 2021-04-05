import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
export declare class ShopMailerService {
    private readonly configService;
    private readonly mailerService;
    constructor(configService: ConfigService, mailerService: MailerService);
    sendTest(): void;
}
