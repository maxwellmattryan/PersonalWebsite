import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { IconModule } from '@app/modules/icon/icon.module';

import { SharedRoutingModule } from './shared-routing.module';

import {
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    LandingComponent,
    LoadingSpinnerComponent,
    PostCollectionComponent,
    ProjectCollectionComponent
} from './components';

@NgModule({
    declarations: [
        AboutComponent,
        FooterComponent,
        HeaderComponent,
        LandingComponent,
        LoadingSpinnerComponent,
        PostCollectionComponent,
        ProjectCollectionComponent
    ],
    imports: [
        CommonModule,
        IconModule,
        MarkdownModule.forRoot(),
        SharedRoutingModule
    ],
    exports: [
        CommonModule,
        AboutComponent,
        FooterComponent,
        HeaderComponent,
        LandingComponent,
        LoadingSpinnerComponent,
        PostCollectionComponent,
        ProjectCollectionComponent
    ]
})
export class SharedModule { }