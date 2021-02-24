import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService, ObfuscationService } from '@ui/core/services';
import { ShopCheckoutService } from '../../services';
import { ShopOrder } from '@ui/modules/shop/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'ui-shop-checkout',
    templateUrl: './shop-checkout.component.html',
    styleUrls: ['./shop-checkout.component.scss']
})
export class ShopCheckoutComponent implements OnInit {
    public isLoaded: boolean = false;

    constructor(
        private readonly notificationService: NotificationService,
        public readonly obfuscationService: ObfuscationService,
        private readonly shopCheckoutService: ShopCheckoutService,
        private readonly titleService: Title,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Shop Checkout | Matthew Maxwell')

        this.activatedRoute.queryParams.subscribe(params => {
            if(params.success == 'true') {
                const productId = params.productId;

                if(params.bypassStripe == 'true') {
                    const customer = this.shopCheckoutService.getCustomer();
                    if(!customer) this.router.navigate(['shop']);

                    this.shopCheckoutService.completeFreeCheckout(productId, customer.email).subscribe((res: ShopOrder) => {
                        this.isLoaded = true;
                    }, (error: HttpErrorResponse) => {
                        this.notificationService.createNotification(error.error.message);
                        this.router.navigate(['shop']);
                    });
                } else {
                    const sessionId = params.sessionId;
                    this.shopCheckoutService.completeCheckout(productId, sessionId).subscribe((res: ShopOrder) => {
                        this.isLoaded = true;
                    }, (error: HttpErrorResponse) => {
                        this.notificationService.createNotification(error.error.message);
                        this.router.navigate(['shop']);
                    });
                }

            }
            else {
                this.notificationService.createNotification('The payment process was canceled.');
                this.router.navigate(['shop']);
            }
        });
    }
}
