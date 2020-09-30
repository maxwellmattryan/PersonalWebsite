import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { SharedModule } from '@app/shared/shared.module';
import { IconModule } from '@app/modules/icon/icon.module';

import { PortfolioComponent } from './portfolio.component';
import { PortfolioRoutingModule } from './portfolio-routing.module';

import { PortfolioProjectCollectionComponent, PortfolioProjectViewComponent } from './components';
import { PortfolioProfileService, PortfolioProfileApiService, PortfolioProjectApiService } from './services';

@NgModule({
    declarations: [
        PortfolioComponent,
        PortfolioProjectCollectionComponent,
        PortfolioProjectViewComponent
    ],
    imports: [
        CommonModule,
        IconModule,
        MarkdownModule.forRoot(),
        PortfolioRoutingModule,
        SharedModule
    ],
    exports: [
        PortfolioProjectCollectionComponent
    ],
    providers: [
        PortfolioProfileService,
        PortfolioProfileApiService,
        PortfolioProjectApiService
    ]
})
export class PortfolioModule { }