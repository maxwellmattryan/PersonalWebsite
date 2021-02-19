import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@ui/core/auth';

import { ShopCategory } from '../../models';
import { ShopApiService, ShopEditorService } from '../../services';
import { NotificationService } from '@ui/core/services';

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
        private readonly notificationService: NotificationService,
        private readonly shopApiService: ShopApiService,
        private readonly shopEditorService: ShopEditorService,
        private readonly titleService: Title,
        private readonly formBuilder: FormBuilder,
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
        this.loadCategoryData();
        this.buildCategoryForm();
    }

    private loadCategoryData(): void {
        this.categoryData = this.shopEditorService.getCategory();
    }

    private buildCategoryForm(): void {
        const isEmpty: boolean = !this.shopEditorService.hasCategory();

        this.categoryForm = this.formBuilder.group({
            name: this.formBuilder.control(isEmpty ? '' : this.categoryData.name, [Validators.required])
        });
    }

    public onSubmit(): void {
        const category = this.buildCategory();
        console.log(category);

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

        return new ShopCategory({ ...c });
    }
}
