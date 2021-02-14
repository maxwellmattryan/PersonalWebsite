import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@ui/core/core.module';
import { MaterialModule } from '@ui/modules/material/material.module';

import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';

import { StoreViewComponent } from './components';
import { ShopApiService } from './services';

@NgModule({
    declarations: [
        StoreComponent,
        StoreViewComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        MaterialModule,
        StoreRoutingModule
    ],
    exports: [],
    providers: [
        ShopApiService
    ]
})
export class StoreModule { }
