import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '@ui/core/auth';
import { NotificationService, TrackingService, ValidationService } from '@ui/core/services';

import { ShopCategory, ShopProduct, ShopProductStatus, ShopProductStatuses } from '../../models';
import { ShopApiService, ShopComparisonService, ShopEditorService } from '../../services';

@Component({
    selector: 'ui-shop-product-editor',
    templateUrl: './shop-product-editor.component.html'
})
export class ShopProductEditorComponent implements OnInit, OnDestroy {
    public isLoaded: boolean = false;

    public categoryData: ShopCategory[];
    public productStatusData: ShopProductStatus[];

    private productData: ShopProduct;
    public productForm: FormGroup;

    constructor(
        private readonly authService: AuthService,
        private readonly notificationService: NotificationService,
        private readonly shopApiService: ShopApiService,
        private readonly shopComparisonService: ShopComparisonService,
        private readonly shopEditorService: ShopEditorService,
        private readonly titleService: Title,
        public readonly trackingService: TrackingService,
        private readonly validationService: ValidationService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Shop Product Editor | Matthew Maxwell');

        this.checkForAdmin();

        this.setPageHideEvent();

        this.initProductForm();

        this.isLoaded = true;
    }

    ngOnDestroy() {
        this.shopEditorService.setProduct(null);
    }

    private checkForAdmin(): void {
        if (!this.authService.isLoggedIn())
            this.router.navigate(['']);
    }

    private setPageHideEvent(): void {
        window.onpagehide = () => {
            this.shopEditorService.setProduct(null);
        };
    }

    private initProductForm(): void {
        this.loadProductData();

        this.loadProductStatusData();
        this.loadCategoryData();

        this.buildProductForm();
    }

    private loadProductData(): void {
        this.productData = this.shopEditorService.getProduct();
    }

    private loadProductStatusData(): void {
        this.shopApiService.getProductStatuses().subscribe((res: ShopProductStatus[]) => {
           this.productStatusData = res.sort(this.shopComparisonService.productStatuses);
        });
    }

    private loadCategoryData(): void {
        this.shopApiService.getCategories().subscribe((res: ShopCategory[]) => {
            this.categoryData = res.sort(this.shopComparisonService.categories);
        });
    }

    private buildProductForm(): void {
        const isEmpty: boolean = !this.shopEditorService.hasProduct();
        const decimalRegex: RegExp = /^(?![.,])\d*[.,]?\d{0,2}$/;

        this.productForm = this.formBuilder.group({
            name: this.formBuilder.control(isEmpty ? '' : this.productData.name, [Validators.required]),
            category: this.formBuilder.control(isEmpty ? '' : this.productData.category.name, [Validators.required]),
            status: this.formBuilder.control(isEmpty ? ShopProductStatuses.AVAILABLE : this.productData.status.status, [Validators.required]),
            amount: this.formBuilder.control(isEmpty ? '' : this.productData.amount, [Validators.required, Validators.pattern(decimalRegex)]),
            preview: this.formBuilder.control(isEmpty ? '' : this.productData.preview, [Validators.required]),
            description: this.formBuilder.control(isEmpty ? '' : this.productData.description, [Validators.required]),
            image_url: this.formBuilder.control(isEmpty ? '' : this.productData.image_url, [Validators.required])
        });
    }

    public onSubmit(): void {
        const product = this.buildProduct();

        if(product.id === undefined) {
            this.shopApiService.createProduct(product).subscribe((res: ShopProduct) => {
                this.notificationService.createNotification('Successfully created new shop product!');
                this.router.navigate(['shop']);
            });
        } else {
            this.shopApiService.updateProduct(product).subscribe((res: ShopProduct) => {
                this.notificationService.createNotification('Successfully updated existing shop product!');
                this.router.navigate(['shop']);
            });
        }
    }

    private buildProduct(): ShopProduct {
        const p = (this.productForm.value as ShopProduct);

        const c = this.buildCategory();
        const s = this.buildProductStatus();

        return new ShopProduct({
            ...p,
            id: this.productData ? this.productData.id : undefined,
            amount: Number(p.amount),
            status: s,
            category: c
        });
    }

    private buildCategory(): ShopCategory {
        return this.categoryData.find(c => c.name === this.productForm.value.category);
    }

    private buildProductStatus(): ShopProductStatus {
        return this.productStatusData.find(s => s.status === this.productForm.value.status);
    }
}
