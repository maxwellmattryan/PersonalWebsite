import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    DashboardComponent,
    LoginComponent,
    RegisterComponent
} from './components';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
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
export class AdminRoutingModule { }