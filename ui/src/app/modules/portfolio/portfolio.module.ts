import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { SharedModule } from '@app/shared/shared.module';
import { IconModule } from '@app/modules/icon/icon.module';

import { PortfolioComponent } from './portfolio.component';
import { PortfolioRoutingModule } from './portfolio-routing.module';

import { ProjectViewComponent } from './components';
import { PortfolioProfileService, PortfolioProfileApiService, PortfolioProjectApiService } from './services';

@NgModule({
    declarations: [
        PortfolioComponent,
        ProjectViewComponent
    ],
    imports: [
        CommonModule,
        IconModule,
        MarkdownModule.forRoot(),
        PortfolioRoutingModule,
        SharedModule
    ],
    providers: [
        PortfolioProfileService,
        PortfolioProfileApiService,
        PortfolioProjectApiService
    ]
})
export class PortfolioModule { }