import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';

import {
    BlogDisplayComponent,
    PostDisplayComponent,
    TopicDisplayComponent
} from './components';

const routes: Routes = [
    {
        path: '',
        component: BlogComponent,
        children: [
            {
                path: '',
                component: BlogDisplayComponent
            },
            {
                path: 'posts/:uri',
                component: PostDisplayComponent
            },
            {
                path: 'topics/:uri',
                component: TopicDisplayComponent
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