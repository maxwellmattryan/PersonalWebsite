import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@app/modules/material/material.module';

import { SharedRoutingModule } from './shared-routing.module';

import {
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    LandingComponent,
    PostCollectionComponent,
    ProjectCollectionComponent
} from './components';

@NgModule({
    declarations: [
        AboutComponent,
        FooterComponent,
        HeaderComponent,
        LandingComponent,
        PostCollectionComponent,
        ProjectCollectionComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedRoutingModule
    ],
    exports: [
        CommonModule,
        AboutComponent,
        FooterComponent,
        HeaderComponent,
        LandingComponent,
        PostCollectionComponent,
        ProjectCollectionComponent
    ]
})
export class SharedModule { }