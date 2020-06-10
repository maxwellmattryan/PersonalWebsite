import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    TopicComponent,
    TopicContainerComponent
} from './components';

@NgModule({
    declarations: [
        TopicComponent,
        TopicContainerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        TopicComponent,
        TopicContainerComponent
    ]
})
export class TopicModule { }