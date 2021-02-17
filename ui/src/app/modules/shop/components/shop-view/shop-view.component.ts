import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '@ui/core/auth';
import { NotificationService, TrackingService } from '@ui/core/services';

import { ShopApiService, ShopCategoryService, ShopComparisonService } from '../../services';
import { ShopCategory, ShopProduct, ShopProductStatuses } from '../../models';

@Component({
    selector: 'ui-shop-view',
    templateUrl: './shop-view.component.html',
    styleUrls: ['./shop-view.component.scss']
})
export class ShopViewComponent implements OnInit {
    public isAdmin: boolean = false;
    public isLoaded: boolean = false;

    public products: ShopProduct[];
    public categories: ShopCategory[];

    activeCategoryId: number = -1;

    constructor(
        private router: Router,
        private authService: AuthService,
        private notificationService: NotificationService,
        private shopApiService: ShopApiService,
        private shopCategoryService: ShopCategoryService,
        private shopComparisonService: ShopComparisonService,
        private titleService: Title,
        public trackingService: TrackingService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle(`Online Shop | Matthew Maxwell`);

        this.isAdmin = this.authService.isLoggedIn();

        this.shopApiService.getProducts(ShopProductStatuses.AVAILABLE).subscribe((res: ShopProduct[]) => {
            this.products = res;
            console.log(this.products);
            this.categories = this.getCategoriesFromProducts();

            if(this.shopCategoryService.hasActiveCategory()) {
                this.filterProducts(this.shopCategoryService.getActiveCategoryId());
                this.shopCategoryService.setActiveCategory(null);
            }

            this.isLoaded = true;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
            this.router.navigate(['']);
        });
    }

    public getCategoriesFromProducts(): ShopCategory[] {
        let categories = new Map<string, ShopCategory>();
        this.products.forEach((val, idx, arr) => {
            if(!categories.has(val.category.name))
                categories.set(val.category.name, val.category);
        });
        return Array.from(categories.values()).sort(this.shopComparisonService.categories);
    }

    public filterProducts(categoryId: number): ShopProduct[] {
        return this.products.filter((val, idx, arr) => val.category.id === categoryId);
    }

    public sendCategoryToEditor(category: ShopCategory): void {
        console.log(-1);
    }

    public deleteCategory(category: ShopCategory): void {
        console.log(-1);
    }
}
