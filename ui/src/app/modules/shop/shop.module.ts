import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@ui/core/core.module';
import { MaterialModule } from '@ui/modules/material/material.module';

import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';

import { ShopProductCollectionComponent, ShopViewComponent } from './components';
import { ShopApiService, ShopCategoryService, ShopComparisonService } from './services';

@NgModule({
    declarations: [
        ShopComponent,
        ShopProductCollectionComponent,
        ShopViewComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        MaterialModule,
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
