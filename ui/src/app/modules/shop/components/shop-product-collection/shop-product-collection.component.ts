import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '@ui/core/auth';
import { NotificationService, SeoService, TrackingService } from '@ui/core/services';

import { ShopProduct } from '../../models';
import { ShopApiService, ShopCheckoutService, ShopEditorService } from '../../services';

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

    constructor(
        private readonly authService: AuthService,
        private readonly notificationService: NotificationService,
        private readonly seoService: SeoService,
        private readonly shopApiService: ShopApiService,
        private readonly shopCheckoutService: ShopCheckoutService,
        private readonly shopEditorService: ShopEditorService,
        public readonly trackingService: TrackingService
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();
    }

    getProductUrl(id: number, name: string): string {
        return `${this.baseRoute}/${this.seoService.getCanonicalUrl(id, name)}`;
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
        this.hasStartedCheckout = true;
        this.checkoutProductId = productData.id;
        this.shopCheckoutService.goToCheckout(productData).subscribe();
    }
}
