import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';

import {
    BlogDisplayComponent,
    PostDisplayComponent,
    TopicDisplayComponent
} from './components';

import { MaterialModule } from 'modules/material/material.module';
import { SharedModule } from 'modules/shared/shared.module';

@NgModule({
    declarations: [
        BlogComponent,
        BlogDisplayComponent,
        PostDisplayComponent,
        TopicDisplayComponent
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