import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@ui/core/auth';

import { ShopCategory, ShopProduct } from '../../models';
import { ShopApiService, ShopComparisonService, ShopEditorService } from '../../services';
import { NotificationService, TrackingService } from '@ui/core/services';

@Component({
    selector: 'ui-shop-category-editor',
    templateUrl: './shop-category-editor.component.html'
})
export class ShopCategoryEditorComponent implements OnInit, OnDestroy {
    public isLoaded: boolean = false;

    public productData: ShopProduct[];

    private categoryData: ShopCategory;
    public categoryForm: FormGroup;

    constructor(
        private readonly authService: AuthService,
        private readonly notificationService: NotificationService,
        private readonly shopApiService: ShopApiService,
        private readonly shopComparisonService: ShopComparisonService,
        private readonly shopEditorService: ShopEditorService,
        private readonly titleService: Title,
        public readonly trackingService: TrackingService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Shop Category Editor | Matthew Maxwell');

        this.checkForAdmin();

        this.setPageHideEvent();

        this.initCategoryForm();
    }

    ngOnDestroy() {
        this.shopEditorService.setCategory(null);
    }

    private checkForAdmin(): void {
        if (!this.authService.isLoggedIn())
            this.router.navigate(['']);
    }

    private setPageHideEvent(): void {
        window.onpagehide = () => {
            this.shopEditorService.setCategory(null);
        };
    }

    private initCategoryForm(): void {
        this.loadCategoryData();

        this.loadProductData();

        this.buildCategoryForm();
    }

    private loadCategoryData(): void {
        this.categoryData = this.shopEditorService.getCategory();
    }

    private loadProductData(): void {
        this.shopApiService.getProducts('AVAILABLE').subscribe((res: ShopProduct[]) => {
            this.productData = res.sort(this.shopComparisonService.products);

            if(this.categoryData) {
                this.setProductControls(this.categoryData.products.map(p => p.id));
            } else {
                this.setProductControls([]);
            }

            this.isLoaded = true;
        });
    }

    private setProductControls(associatedProductIds: number[]): void {
        this.productData.forEach(p => {
            const isAssociated = associatedProductIds.includes(p.id);
            const control: FormControl = this.formBuilder.control({ value: isAssociated, disabled: isAssociated });
            (this.categoryForm.controls.products as FormArray).push(control);
        });
    }

    private buildCategoryForm(): void {
        const isEmpty: boolean = !this.shopEditorService.hasCategory();

        this.categoryForm = this.formBuilder.group({
            name: this.formBuilder.control(isEmpty ? '' : this.categoryData.name, [Validators.required]),
            products: this.formBuilder.array([], [])
        });
    }

    public onSubmit(): void {
        const category = this.buildCategory();

        if(category.id === undefined) {
            this.shopApiService.createCategory(category).subscribe((res: ShopCategory) => {
                this.notificationService.createNotification('Successfully created shop category!');
                this.router.navigate(['shop']);
            });
        } else {
            this.shopApiService.updateCategory(category).subscribe((res: ShopCategory) => {
                this.notificationService.createNotification('Successfully updated existing shop category!');
                this.router.navigate(['shop']);
            });
        }
    }

    private buildCategory(): ShopCategory {
        const c = (this.categoryForm.value as ShopCategory);

        const p = this.buildProducts();

        return new ShopCategory({
            ...c,
            id: this.categoryData ? this.categoryData.id : undefined,
            products: p
        });
    }

    private buildProducts(): ShopProduct[] {
        return (this.categoryForm.value as ShopCategory).products.map((p, idx) => {
            if(p) return this.productData[idx];
        }).filter(p => p !== undefined);
    }
}
