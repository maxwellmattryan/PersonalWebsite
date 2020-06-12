import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { MaterialModule } from '@app/modules/material/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';

import {
    BlogViewComponent,
    PostViewComponent,
    TopicViewComponent
} from './components';

@NgModule({
    declarations: [
        BlogComponent,
        BlogViewComponent,
        PostViewComponent,
        TopicViewComponent
    ],
    imports: [
        BlogRoutingModule,
        CommonModule,
        MarkdownModule.forRoot(),
        MaterialModule,
        SharedModule
    ]
})
export class BlogModule { }