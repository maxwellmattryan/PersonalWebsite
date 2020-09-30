import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MarkdownModule } from 'ngx-markdown';

import { IconModule } from '@app/modules/icon/icon.module';
import { MaterialModule } from '@app/modules/material/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { PortfolioComponent } from './portfolio.component';
import { PortfolioRoutingModule } from './portfolio-routing.module';

import {
    PortfolioProfileEditorComponent,
    PortfolioProjectCollectionComponent,
    PortfolioProjectViewComponent,
    PortfolioProjectEditorComponent
} from './components';
import {
    PortfolioProfileService,
    PortfolioProfileApiService,
    PortfolioProjectApiService
} from './services';

@NgModule({
    declarations: [
        PortfolioComponent,
        PortfolioProfileEditorComponent,
        PortfolioProjectCollectionComponent,
        PortfolioProjectEditorComponent,
        PortfolioProjectViewComponent
    ],
    imports: [
        CommonModule,
        IconModule,
        MarkdownModule.forRoot(),
        MaterialModule,
        PortfolioRoutingModule,
        ReactiveFormsModule,
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