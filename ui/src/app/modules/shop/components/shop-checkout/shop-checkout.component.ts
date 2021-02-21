import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService, ObfuscationService } from '@ui/core/services';

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
        private readonly titleService: Title,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Shop Checkout | Matthew Maxwell')

        this.activatedRoute.queryParams.subscribe(params => {
            const wasSuccess = params.success == "true";
            if(wasSuccess) {
                console.log(params);

                // TODO: Make API request to /api/shop/checkout/complete

                this.isLoaded = true;
            }
            else {
                this.notificationService.createNotification('The payment process was canceled.');
                this.router.navigate(['shop']);
            }
        });
    }
}
