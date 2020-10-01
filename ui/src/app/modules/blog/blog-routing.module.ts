import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';

import {
    BlogPostEditorComponent,
    BlogPostViewComponent,
    BlogTopicEditorComponent,
    BlogViewComponent
} from './components';

const routes: Routes = [
    {
        path: '',
        component: BlogComponent,
        children: [
            {
                path: '',
                component: BlogViewComponent
            },
            {
                path: 'posts/editor',
                component: BlogPostEditorComponent
            },
            {
                path: 'posts/:id/:uri',
                component: BlogPostViewComponent
            },
            {
                path: 'topics/editor',
                component: BlogTopicEditorComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class BlogRoutingModule { }