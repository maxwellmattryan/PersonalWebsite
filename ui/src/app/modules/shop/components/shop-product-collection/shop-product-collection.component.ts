import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '@ui/core/auth';
import { NotificationService, SeoService, TrackingService } from '@ui/core/services';

import { ShopCustomer, ShopProduct } from '../../models';
import { ShopApiService, ShopCheckoutService, ShopEditorService } from '../../services';
import { Router } from '@angular/router';

@Component({
    selector: 'ui-shop-product-collection',
    templateUrl: './shop-product-collection.component.html',
    styleUrls: ['./shop-product-collection.component.scss']
})
export class ShopProductCollectionComponent implements OnInit {
    @Input() products: ShopProduct[];

    // CAUTION: This is necessary because the routing changes when this component is used outside of the shop module
    @Input() baseRoute: string = 'shop/products';

    public isAdmin: boolean = false;
    public hasStartedCheckout: boolean = false;
    public checkoutProductId: number = -1;
    public modalId: string = 'shop-checkout-modal';

    constructor(
        private readonly authService: AuthService,
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
        this.checkoutProductId = productData.id;

        if(productData.amount <= 0.0) {
            this.showDialog();
        } else {
            this.hasStartedCheckout = true;
            this.shopCheckoutService.goToCheckout(productData).subscribe();
        }
    }

    public startFreeCheckout(customerData: ShopCustomer): void {
        if(this.checkoutProductId == -1) return;

        this.shopCheckoutService.setCustomer(customerData);

        this.router.navigate(
            ['shop/checkout'],
            { queryParams: { success: 'true', productId: this.checkoutProductId, bypassStripe: 'true' }}
        );
    }
}
