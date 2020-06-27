import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';

import {
    ProjectViewComponent
} from './components';

@NgModule({
    declarations: [
        ProjectComponent,
        ProjectViewComponent
    ],
    imports: [
        CommonModule,
        MarkdownModule.forRoot(),
        ProjectRoutingModule
    ]
})
export class ProjectModule { }