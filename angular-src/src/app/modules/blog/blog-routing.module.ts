import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';

import {
    BlogViewComponent,
    PostViewComponent
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
                path: 'posts/:uri',
                component: PostViewComponent
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