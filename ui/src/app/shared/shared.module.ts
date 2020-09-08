import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '@app/modules/icon/icon.module';
import { MaterialModule } from '@app/modules/material/material.module';

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
        MaterialModule,
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