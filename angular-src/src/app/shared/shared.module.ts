import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@app/modules/material/material.module';

import { SharedRoutingModule } from './shared-routing.module';

import {
    FooterComponent,
    HeaderComponent,
    PostContainerComponent,
    ProjectContainerComponent,
    TopicContainerComponent
} from './components';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        PostContainerComponent,
        ProjectContainerComponent,
        TopicContainerComponent
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
        PostContainerComponent,
        ProjectContainerComponent,
        TopicContainerComponent
    ]
})
export class SharedModule { }