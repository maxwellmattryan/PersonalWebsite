import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ObfuscationService } from '@ui/core/services/obfuscation.service';

@Component({
    selector: 'ui-shop-checkout',
    templateUrl: './shop-checkout.component.html',
    styleUrls: ['./shop-checkout.component.scss']
})
export class ShopCheckoutComponent implements OnInit {
    public isLoaded: boolean = false;

    constructor(
        public readonly obfuscationService: ObfuscationService,
        private readonly titleService: Title,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Shop Checkout | Matthew Maxwell')

        this.activatedRoute.queryParams.subscribe(params => {
            const wasSuccess = Boolean(params.success);
            if(wasSuccess) {
                console.log(params);
                this.isLoaded = true;
            }
            else {
                this.router.navigate(['shop']);
            }
        });
    }
}
