import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { AuthService } from '@ui/core/auth';

import { ShopCategory } from '../../models';
import { ShopEditorService } from '../../services';

@Component({
    selector: 'ui-shop-category-editor',
    templateUrl: './shop-category-editor.component.html'
})
export class ShopCategoryEditorComponent implements OnInit, OnDestroy {
    public isLoaded: boolean = false;

    public categoryData: ShopCategory;

    public categoryForm: FormGroup;

    constructor(
        private readonly authService: AuthService,
        private readonly shopEditorService: ShopEditorService,
        private readonly titleService: Title,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Shop Category Editor | Matthew Maxwell');

        this.checkForAdmin();
        this.setPageHideEvent();

        this.initCategoryForm();

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

    private initCategoryForm(): void {
        // load category data
        // build category form
    }

    public onSubmit(): void {
        // build category
        // make API call(s)
    }
}
