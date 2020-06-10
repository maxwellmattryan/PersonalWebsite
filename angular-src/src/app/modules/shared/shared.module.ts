import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedRoutingModule } from './shared-routing.module';

import {
    PostContainerComponent,
    ProjectContainerComponent,
    TopicContainerComponent
} from './components';

@NgModule({
    declarations: [
        PostContainerComponent,
        ProjectContainerComponent,
        TopicContainerComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule
    ], 
    exports: [
        CommonModule,
        PostContainerComponent,
        ProjectContainerComponent,
        TopicContainerComponent
    ]
})
export class SharedModule { }
