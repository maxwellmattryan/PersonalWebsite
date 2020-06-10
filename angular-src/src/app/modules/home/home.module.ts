import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import {
    HomeDisplayComponent
} from './components';

import { NavigationModule } from 'modules/navigation/navigation.module';

@NgModule({
    declarations: [
        HomeComponent,
        HomeDisplayComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        NavigationModule
    ]
})
export class HomeModule { }
