import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    ProjectComponent,
    ProjectContainerComponent
} from './components';

@NgModule({
    declarations: [
        ProjectComponent,
        ProjectContainerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ProjectComponent,
        ProjectContainerComponent
    ]
})
export class ProjectModule { }
