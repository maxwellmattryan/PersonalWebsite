import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '@ui/core/auth';
import { FileService, NotificationService, SeoService, TrackingService } from '@ui/core/services';

import { ShopCustomer, ShopProduct, ShopProductStatuses } from '../../models';
import { ShopApiService, ShopCheckoutService, ShopEditorService } from '../../services';

@Component({
    selector: 'ui-shop-product-collection',
    templateUrl: './shop-product-collection.component.html',
    styleUrls: ['./shop-product-collection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopProductCollectionComponent implements OnInit {
    @Input() products: ShopProduct[];

    // CAUTION: This is necessary because the routing changes when this component is used outside of the shop module
    @Input() baseRoute: string = 'shop/products';

    public isAdmin: boolean = false;
    public isStartingCheckout: boolean = false;
    public checkoutProductId: number = -1;
    public modalId: string = 'shop-checkout-modal';

    constructor(
        private readonly authService: AuthService,
        public readonly fileService: FileService,
        private readonly notificationService: NotificationService,
        private readonly seoService: SeoService,
        private readonly shopApiService: ShopApiService,
        private readonly shopCheckoutService: ShopCheckoutService,
        private readonly shopEditorService: ShopEditorService,
        public readonly trackingService: TrackingService,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();
    }

    getProductUrl(id: number, name: string): string {
        return `${this.baseRoute}/${this.seoService.getCanonicalUrl(id, name)}`;
    }

    public showDialog(): void {
        let modal = document.getElementById(this.modalId);

        modal.classList.remove('init');
        modal.classList.remove('hidden');
        modal.classList.add('show');
    }

    public closeDialog(): void {
        let modal = document.getElementById(this.modalId);

        modal.classList.remove('show');
        modal.classList.add('hidden');
    }

    public sendProductToEditor(product: ShopProduct): void {
        this.shopEditorService.setProduct(product);
    }

    public deleteProduct(productId: number): void {
        if(!this.notificationService.deleteConfirmation('shop product')) return;

        this.shopApiService.deleteProduct(productId, false).subscribe((res: void) => {
            this.products = this.products.filter(p => p.id !== productId);
            this.notificationService.createNotification('Successfully deleted shop product!');
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        })
    }

    public formatAmount(n: number): string {
        return Number(n).toFixed(2);
    }

    public startCheckout(productData: ShopProduct): void {
        if(productData.status.status != ShopProductStatuses.AVAILABLE) {
            this.notificationService.createNotification(`Sorry, unable to buy product because it is ${productData.status.status.toLowerCase()}.`, '', 3600);
            return;
        }

        this.checkoutProductId = productData.id;

        if(productData.amount <= 0.0) {
            this.showDialog();
        } else {
            this.isStartingCheckout = true;
            this.shopCheckoutService.goToCheckout(productData).subscribe((res: any) => {
                this.isStartingCheckout = false;
            });

            setTimeout(this.timeoutFn, 10000);
        }
    }

    private timeoutFn = () => {
        if(!this.isStartingCheckout) return;

        this.isStartingCheckout = false;
        this.notificationService.createNotification('Sorry, unable to initialize Stripe Checkout. Please refresh and try again.', '', 3600);
    };

    public startFreeCheckout(customerData: ShopCustomer): void {
        if(this.checkoutProductId == -1) return;

        this.shopCheckoutService.setCustomer(customerData);

        this.router.navigate(
            ['shop/checkout'],
            { queryParams: { success: 'true', productId: this.checkoutProductId, freeProduct: 'true' }}
        );
    }
}
