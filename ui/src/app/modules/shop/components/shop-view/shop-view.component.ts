import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from '@ui/core/services';

import { ShopApiService } from '../../services';
import { ShopProduct, ShopProductStatuses } from '../../models';

@Component({
    selector: 'ui-shop-view',
    templateUrl: './shop-view.component.html',
    styleUrls: ['./shop-view.component.scss']
})
export class ShopViewComponent implements OnInit {
    public isLoaded: boolean = false;

    public products: ShopProduct[];

    constructor(
        private router: Router,
        private notificationService: NotificationService,
        private shopApiService: ShopApiService
    ) { }

    ngOnInit(): void {
        this.shopApiService.getProducts(ShopProductStatuses.AVAILABLE).subscribe((res: ShopProduct[]) => {
            this.products = res;

            this.isLoaded = true;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
            this.router.navigate(['']);
        });
    }
}
