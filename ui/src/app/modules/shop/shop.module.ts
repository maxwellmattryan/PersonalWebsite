import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@ui/core/core.module';
import { MaterialModule } from '@ui/modules/material/material.module';

import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';

import { ShopViewComponent } from './components';
import { ShopApiService } from './services';

@NgModule({
    declarations: [
        ShopComponent,
        ShopViewComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        MaterialModule,
        ShopRoutingModule
    ],
    exports: [],
    providers: [
        ShopApiService
    ]
})
export class ShopModule { }
