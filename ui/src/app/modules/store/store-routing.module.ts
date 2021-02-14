import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreComponent } from './store.component';

import {
    StoreViewComponent
} from './components';

export const routes: Routes = [
    {
        path: '',
        component: StoreComponent,
        children: [
            {
                path: '',
                component: StoreViewComponent
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
export class StoreRoutingModule { }
