import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '@ui/core/core.module';
import { MaterialModule } from '@ui/modules/material/material.module';

import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';

import { ShopProductCollectionComponent, ShopProductEditorComponent, ShopViewComponent } from './components';
import { ShopApiService, ShopCategoryService, ShopComparisonService } from './services';

@NgModule({
    declarations: [
        ShopComponent,
        ShopProductCollectionComponent,
        ShopProductEditorComponent,
        ShopViewComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
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
        ShopComparisonService
    ]
})
export class ShopModule { }
