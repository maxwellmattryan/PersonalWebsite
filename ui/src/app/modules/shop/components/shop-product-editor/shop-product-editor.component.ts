import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '@ui/core/auth';
import { TrackingService, ValidationService } from '@ui/core/services';

import { ShopCategory, ShopProduct, ShopProductStatus } from '../../models';
import { ShopApiService, ShopComparisonService, ShopEditorService } from '../../services';

@Component({
    selector: 'ui-shop-product-editor',
    templateUrl: './shop-product-editor.component.html'
})
export class ShopProductEditorComponent implements OnInit, OnDestroy {
    public isLoaded: boolean = false;

    private productData: ShopProduct;
    public statusData: ShopProductStatus[];
    public categoryData: ShopCategory[];

    public productForm: FormGroup;

    constructor(
        private readonly authService: AuthService,
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
        // load category data

        this.buildProductForm();
    }

    private loadProductData(): void {
        this.productData = this.shopEditorService.getProduct();
    }

    private loadProductStatusData() {
        this.shopApiService.getProductStatuses().subscribe((res: ShopProductStatus[]) => {
           this.statusData = res.sort(this.shopComparisonService.productStatuses);
           console.log(this.statusData);
        });
    }

    private buildProductForm(): void {
        const isEmpty = this.productData === undefined;
        const decimalRegex: RegExp = /^(?![.,])\d*[.,]?\d{0,2}$/;

        this.productForm = this.formBuilder.group({
            name: this.formBuilder.control(isEmpty ? '' : this.productData.name, [Validators.required]),
            //category
            status: this.formBuilder.control(isEmpty ? 'AVAILABLE' : this.productData.status.status, [Validators.required]),
            amount: this.formBuilder.control(isEmpty ? '' : this.productData.amount, [Validators.required, Validators.pattern(decimalRegex)]),
            preview: this.formBuilder.control(isEmpty ? '' : this.productData.preview, [Validators.required]),
            description: this.formBuilder.control(isEmpty ? '' : this.productData.description, [Validators.required]),
            image_url: this.formBuilder.control(isEmpty ? '' : this.productData.image_url, [Validators.required])
        });
    }

    public onSubmit(): void {
        const product = this.buildProduct();
        console.log(this.productForm);
        console.log(product);

        if(product.id === undefined) {
            // create product
        } else {
            // update product
        }
    }

    private buildProduct(): ShopProduct {
        const p = (this.productForm.value as ShopProduct);

        const s = this.buildStatus();

        return new ShopProduct({
            ...p,
            id: this.productData ? this.productData.id : undefined,
            amount: Number(p.amount),
            status: s
        });
    }

    private buildStatus(): ShopProductStatus {
        return this.statusData.find(s => s.status === this.productForm.value.status);
    }
}
