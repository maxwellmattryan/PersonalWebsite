import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@app/modules/material/material.module';

import { SharedRoutingModule } from './shared-routing.module';

import {
    FooterComponent,
    HeaderComponent,
    PostCollectionComponent,
    ProjectCollectionComponent
} from './components';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
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
        FooterComponent,
        HeaderComponent,
        PostCollectionComponent,
        ProjectCollectionComponent
    ]
})
export class SharedModule { }