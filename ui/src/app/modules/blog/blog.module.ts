import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MarkdownModule } from 'ngx-markdown';

import { SharedModule } from '@ui/shared/shared.module';
import { MaterialModule } from '@ui/modules/material/material.module';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';

import {
    BlogPostCollectionComponent,
    BlogPostEditorComponent,
    BlogPostViewComponent,
    BlogTopicEditorComponent,
    BlogViewComponent
} from './components';
import { BlogPostEditorService, BlogTopicService } from './services';

@NgModule({
    declarations: [
        BlogComponent,
        BlogPostCollectionComponent,
        BlogPostEditorComponent,
        BlogPostViewComponent,
        BlogTopicEditorComponent,
        BlogViewComponent
    ],
    imports: [
        BlogRoutingModule,
        CommonModule,
        MarkdownModule.forRoot(),
        MaterialModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        BlogPostCollectionComponent
    ],
    providers: [
        BlogPostEditorService,
        BlogTopicService
    ]
})
export class BlogModule { }