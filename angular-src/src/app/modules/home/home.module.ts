import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@app/modules/material/material.module';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import {
    HomeDisplayComponent
} from './components';

@NgModule({
    declarations: [
        HomeComponent,
        HomeDisplayComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialModule
    ]
})
export class HomeModule { }
