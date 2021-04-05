import { MailerService } from '@nestjs-modules/mailer';
import { UtilsService } from '@api/core/utils/utils.service';
export declare class MailProcessor {
    private readonly mailerService;
    private readonly utilsService;
    private readonly logger;
    constructor(mailerService: MailerService, utilsService: UtilsService);
    private onActive;
    private onCompleted;
    private onFailed;
    private sendMultiDownloadEmail;
    private sendOrderConfirmationEmail;
}
