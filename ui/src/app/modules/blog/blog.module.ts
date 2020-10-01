import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MarkdownModule } from 'ngx-markdown';

import { CoreModule } from '@ui/core/core.module';
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
import {
    BlogApiService,
    BlogComparisonService
} from './services';

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
        CoreModule,
        MarkdownModule.forRoot(),
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        BlogPostCollectionComponent
    ],
    providers: [
        BlogApiService,
        BlogComparisonService
    ]
})
export class BlogModule { }