import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { SharedModule } from '@app/shared/shared.module';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';

import {
    BlogViewComponent,
    PostViewComponent
} from './components';

@NgModule({
    declarations: [
        BlogComponent,
        BlogViewComponent,
        PostViewComponent
    ],
    imports: [
        BlogRoutingModule,
        CommonModule,
        MarkdownModule.forRoot(),
        SharedModule
    ]
})
export class BlogModule { }