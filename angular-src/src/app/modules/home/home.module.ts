import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@app/modules/material/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import {
    HomeViewComponent
} from './components';

@NgModule({
    declarations: [
        HomeComponent,
        HomeViewComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialModule,
        SharedModule
    ]
})
export class HomeModule { }
