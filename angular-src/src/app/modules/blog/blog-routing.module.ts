import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    BlogComponent,
    PostComponent,
    TopicComponent
} from './components';

const routes: Routes = [
    {
        path: '',
        component: BlogComponent,
        children: [
            {
                path: 'posts/:uri',
                component: PostComponent
            },
            {
                path: 'topics/:uri',
                component: TopicComponent
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