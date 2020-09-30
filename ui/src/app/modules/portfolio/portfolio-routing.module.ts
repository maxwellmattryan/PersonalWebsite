import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioComponent } from './portfolio.component';

import {
    ProjectViewComponent
} from './components';

export const routes: Routes = [
    {
        path: '',
        component: PortfolioComponent,
        children: [
            {
                path: 'projects/:id/:uri',
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
export class PortfolioRoutingModule { }