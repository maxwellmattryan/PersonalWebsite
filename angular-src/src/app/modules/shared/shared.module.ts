import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
        FormsModule,
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
