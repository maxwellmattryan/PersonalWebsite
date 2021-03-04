import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';

import { GCloudStorageService } from '@api/core/gcloud/gcloud-storage.service';
import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { MailService } from '@api/modules/mail/mail.service';

import { ShopCustomer } from '../entities/shop-customer.entity';
import { ShopOrder } from '../entities/shop-order.entity';

import { ShopCustomerService } from '../services/shop-customer.service';
import { ShopOrderService } from '../services/shop-order.service';

import { ShopCustomerWasNotFoundException } from '../exceptions/shop-customer.exception';
import { ShopOrdersWereNotFoundException } from '../exceptions/shop-order.exception';

@Controller('shop/customers')
export class ShopCustomerController {
    constructor(
        private readonly gCloudStorageService: GCloudStorageService,
        private readonly mailService: MailService,
        private readonly shopCustomerService: ShopCustomerService,
        private readonly shopOrderService: ShopOrderService
    ) { }

    @Post('')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    public async createCustomer(
        @Body() customerData: ShopCustomer
    ): Promise<ShopCustomer> {
        return this.shopCustomerService.createCustomer(customerData);
    }

    @Post('help')
    @HttpCode(201)
    public async helpCustomer(
        @Body() customerData: ShopCustomer
    ): Promise<void> {
        const email: string = customerData.email;
        const customer: ShopCustomer = await this.shopCustomerService.getCustomer(-1, email);
        if(!customer) throw new ShopCustomerWasNotFoundException();

        const orders: ShopOrder[] = await this.shopOrderService.getOrdersByCustomer(customer.id);
        if(!orders) throw new ShopOrdersWereNotFoundException();

        const productFilenames = orders.map(so => so.product.filename);
        const signedUrls = await this.gCloudStorageService.getSignedUrls(productFilenames);

        await this.mailService.sendMultiDownloadEmail(customer, orders, signedUrls);
    }
}
