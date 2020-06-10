import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavigationComponent } from './navigation.component';
import { NavigationRoutingModule } from './navigation-routing.module';

import {
    NavbarComponent,
    SideMenuComponent
} from './components';

import { MaterialModule } from 'modules/material/material.module';

@NgModule({
    declarations: [
        NavbarComponent,
        NavigationComponent,
        SideMenuComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        NavigationRoutingModule
    ],
    exports: [
        CommonModule,
        NavigationComponent
    ]
})
export class NavigationModule { }
