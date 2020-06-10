import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlogRoutingModule } from './blog-routing.module';

import {
    BlogComponent,
    PostComponent,
    TopicComponent
} from './components';

import { MaterialModule } from 'modules/material/material.module';
import { SharedModule } from 'modules/shared/shared.module';

@NgModule({
    declarations: [
        BlogComponent,
        PostComponent,
        TopicComponent
    ],
    imports: [
        BlogRoutingModule,
        CommonModule,
        MaterialModule,
        SharedModule
    ],
    exports: [
        BlogComponent,
        PostComponent,
        TopicComponent
    ]
})
export class BlogModule { }