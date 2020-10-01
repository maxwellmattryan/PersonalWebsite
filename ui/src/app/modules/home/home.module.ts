import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '@ui/core/core.module';
import { BlogModule } from '@ui/modules/blog/blog.module';
import { PortfolioModule } from '@ui/modules/portfolio/portfolio.module';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { HomeApiService } from './services';
import { HomeAboutComponent, HomeLandingComponent } from './components';

@NgModule({
    declarations: [
        HomeComponent,
        HomeAboutComponent,
        HomeLandingComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        HomeRoutingModule,
        BlogModule,
        PortfolioModule
    ],
    providers: [
        HomeApiService
    ]
})
export class HomeModule { }
