import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '@ui/core/auth';
import { ValidationService } from '@ui/core/services';

import { ShopProduct } from '../../models';
import { ShopEditorService } from '../../services';

@Component({
    selector: 'ui-shop-product-editor',
    templateUrl: './shop-product-editor.component.html'
})
export class ShopProductEditorComponent implements OnInit, OnDestroy {
    public isLoaded: boolean = false;

    private productData: ShopProduct;

    public productForm: FormGroup;

    constructor(
        private readonly authService: AuthService,
        private readonly shopEditorService: ShopEditorService,
        private readonly titleService: Title,
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

        // load status data
        // load category data

        this.buildProductForm();
    }

    private loadProductData(): void {
        this.productData = this.shopEditorService.getProduct();
    }

    private buildProductForm(): void {
        const isEmpty = this.productData === undefined;
        const priceRegex: RegExp = /^\d*[.,]?\d{0,2}$/;

        this.productForm = this.formBuilder.group({
            name: this.formBuilder.control(isEmpty ? '' : this.productData.name, [Validators.required]),
            //category
            //status: this.formBuilder.control(isEmpty ? 'AVAILABLE' : this.productData.status.status, [Validators.required]),
            amount: this.formBuilder.control(isEmpty ? '' : this.productData.amount, [Validators.required, Validators.pattern(priceRegex)]),
            preview: this.formBuilder.control(isEmpty ? '' : this.productData.preview, [Validators.required]),
            description: this.formBuilder.control(isEmpty ? '' : this.productData.description, [Validators.required]),
            image_url: this.formBuilder.control(isEmpty ? '' : this.productData.image_url, [Validators.required])
        });
    }

    public onSubmit(): void {

    }
}
