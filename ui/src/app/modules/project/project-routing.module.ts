import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from './project.component';

import {
    ProjectViewComponent
} from './components';

export const routes: Routes = [
    {
        path: '',
        component: ProjectComponent,
        children: [
            {
                path: ':id',
                component: ProjectViewComponent
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
export class ProjectRoutingModule { }