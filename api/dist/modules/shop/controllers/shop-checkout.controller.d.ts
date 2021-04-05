import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GCloudStorageService } from '@api/core/gcloud/gcloud-storage.service';
import { Id } from '@api/core/database/entity.service';
import { MailService } from '@api/modules/mail/mail.service';
import { ShopCustomer } from "../entities/shop-customer.entity";
import { ShopProduct } from "../entities/shop-product.entity";
import { ShopCheckoutService } from '../services/shop-checkout.service';
import { ShopOrderService } from '../services/shop-order.service';
export declare class ShopCheckoutController {
    private readonly configService;
    private readonly gCloudStorageService;
    private readonly httpService;
    private readonly mailService;
    private readonly shopCheckoutService;
    private readonly shopOrderService;
    constructor(configService: ConfigService, gCloudStorageService: GCloudStorageService, httpService: HttpService, mailService: MailService, shopCheckoutService: ShopCheckoutService, shopOrderService: ShopOrderService);
    createCheckoutSession(productData: ShopProduct): Promise<{
        id: string;
    }>;
    completeCheckoutSession(isFreeProduct: boolean, productId: Id, sessionId: string, customerData: ShopCustomer): Promise<any>;
}
