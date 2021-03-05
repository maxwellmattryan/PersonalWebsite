import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService, ObfuscationService } from '@ui/core/services';
import { ShopCheckoutService } from '../../services';
import { ShopOrder } from '@ui/modules/shop/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'ui-shop-checkout-view',
    templateUrl: './shop-checkout-view.component.html',
    styleUrls: ['./shop-checkout-view.component.scss']
})
export class ShopCheckoutViewComponent implements OnInit {
    public isLoaded: boolean = false;

    public order: ShopOrder;

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
                const isFreeProduct: boolean = params.isFreeProduct == 'true';

                const callbackFn = (res: ShopOrder) => {
                    this.order = res;
                    this.isLoaded = true;
                };
                const errorFn = (error: HttpErrorResponse) => {
                    this.notificationService.createNotification(error.error.message, '', 3600);
                    this.router.navigate(['shop']);
                };

                if(isFreeProduct) {
                    const customer = this.shopCheckoutService.getCustomer();
                    if(!customer) this.router.navigate(['shop']);

                    this.shopCheckoutService.completeFreeCheckout(productId, customer.email).subscribe(callbackFn, errorFn);
                } else {
                    const sessionId = params.sessionId;
                    this.shopCheckoutService.completeCheckout(productId, sessionId).subscribe(callbackFn, errorFn);
                }

            }
            else {
                this.notificationService.createNotification('The payment process was canceled.');
                this.router.navigate(['shop']);
            }
        });
    }
}
