import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavigationRoutingModule } from './navigation-routing.module';

import {
    NavbarComponent
} from './components';

import { MaterialModule } from 'modules/material/material.module';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        NavigationRoutingModule
    ],
    exports: [
        CommonModule,
        NavbarComponent
    ]
})
export class NavigationModule { }
