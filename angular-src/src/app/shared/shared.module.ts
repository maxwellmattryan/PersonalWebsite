import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@app/modules/material/material.module';

import { SharedRoutingModule } from './shared-routing.module';

import {
    FooterComponent,
    HeaderComponent,
    PostCollectionComponent,
    ProjectCollectionComponent,
    TopicCollectionComponent
} from './components';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        PostCollectionComponent,
        ProjectCollectionComponent,
        TopicCollectionComponent
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
        ProjectCollectionComponent,
        TopicCollectionComponent
    ]
})
export class SharedModule { }