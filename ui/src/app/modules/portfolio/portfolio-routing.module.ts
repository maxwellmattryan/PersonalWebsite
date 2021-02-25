import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioComponent } from './portfolio.component';

import {
    PortfolioProfileEditorComponent,
    PortfolioProjectEditorComponent,
    PortfolioProjectViewComponent
} from './components';

const routes: Routes = [
    {
        path: '',
        component: PortfolioComponent,
        children: [
            {
                path: 'profiles/editor',
                component: PortfolioProfileEditorComponent
            },
            {
                path: 'projects/editor',
                component: PortfolioProjectEditorComponent
            },
            {
                path: 'projects/:id/:uri',
                component: PortfolioProjectViewComponent
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