import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    DashboardComponent,
    LoginComponent,
    RegisterComponent
} from './components';

export const routes: Routes = [
    { path: 'admin', component: DashboardComponent },
    { path: 'admin/login', component: LoginComponent },
    { path: 'admin/register', component: RegisterComponent }
];

export const AdminModuleRouting: ModuleWithProviders = RouterModule.forChild(routes);