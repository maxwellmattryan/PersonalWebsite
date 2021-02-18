import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ShopProduct } from '../../models';
import { Router } from '@angular/router';

@Component({
    selector: 'ui-shop-product-editor',
    templateUrl: './shop-product-editor.component.html'
})
export class ShopProductEditorComponent implements OnInit {
    public isLoaded: boolean = false;

    private productData: ShopProduct;

    public productForm: FormGroup;

    constructor(
        private titleService: Title,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Shop Product Editor | Matthew Maxwell');

        // check for admin
        // set page hide event

        this.initProductForm();
    }

    private initProductForm(): void {
        // load status data
        // load category data

        this.buildProductForm();
    }

    private buildProductForm(): void {
        if(this.productData) {
            this.productForm = this.formBuilder.group({
                name: '',
                preview: '',
                description: '',
                image_url: ''
            });
        }
    }

    public onSubmit(): void {

    }
}
