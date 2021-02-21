import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MarkdownModule } from 'ngx-markdown';

import { CoreModule } from '@ui/core/core.module';
import { MaterialModule } from '@ui/modules/material/material.module';

import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';

import {
    ShopCategoryEditorComponent,
    ShopCheckoutComponent,
    ShopCheckoutModalComponent,
    ShopProductCollectionComponent,
    ShopProductEditorComponent,
    ShopViewComponent
} from './components';
import {
    ShopApiService,
    ShopCategoryService,
    ShopCheckoutService,
    ShopComparisonService,
    ShopEditorService
} from './services';

@NgModule({
    declarations: [
        ShopComponent,
        ShopCategoryEditorComponent,
        ShopCheckoutComponent,
        ShopCheckoutModalComponent,
        ShopProductCollectionComponent,
        ShopProductEditorComponent,
        ShopViewComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        MarkdownModule.forRoot(),
        MaterialModule,
        ReactiveFormsModule,
        ShopRoutingModule
    ],
    exports: [
        ShopProductCollectionComponent
    ],
    providers: [
        ShopApiService,
        ShopCategoryService,
        ShopCheckoutService,
        ShopComparisonService,
        ShopEditorService
    ]
})
export class ShopModule { }
