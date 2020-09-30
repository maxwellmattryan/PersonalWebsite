import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlogModule } from '@ui/modules/blog/blog.module';
import { PortfolioModule } from '@ui/modules/portfolio/portfolio.module';
import { SharedModule } from '@ui/shared/shared.module';

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
        BlogModule,
        PortfolioModule,
        SharedModule
    ]
})
export class HomeModule { }
