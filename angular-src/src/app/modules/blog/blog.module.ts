import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';

import {
    BlogDisplayComponent,
    PostComponent,
    TopicComponent
} from './components';

import { MaterialModule } from 'modules/material/material.module';
import { SharedModule } from 'modules/shared/shared.module';

@NgModule({
    declarations: [
        BlogComponent,
        BlogDisplayComponent,
        PostComponent,
        TopicComponent
    ],
    imports: [
        BlogRoutingModule,
        CommonModule,
        MaterialModule,
        SharedModule
    ]
})
export class BlogModule { }