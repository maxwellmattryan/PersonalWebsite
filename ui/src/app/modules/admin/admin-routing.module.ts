import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

import {
    DashboardViewComponent,
    LoginViewComponent,
    RegisterViewComponent
} from './components';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: DashboardViewComponent
            },
            {
                path: 'login',
                component: LoginViewComponent
            },
            {
                path: 'register',
                component: RegisterViewComponent
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