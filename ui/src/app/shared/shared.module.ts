import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { IconModule } from '@ui/modules/icon/icon.module';

import { SharedRoutingModule } from './shared-routing.module';

import {
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    LandingComponent,
    LoadingSpinnerComponent,
} from './components';

@NgModule({
    declarations: [
        AboutComponent,
        FooterComponent,
        HeaderComponent,
        LandingComponent,
        LoadingSpinnerComponent,
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
    ]
})
export class SharedModule { }