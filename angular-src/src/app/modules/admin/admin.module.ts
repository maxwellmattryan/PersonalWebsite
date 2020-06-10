import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AdminModuleRouting } from './admin.routing';

import {
    DashboardComponent,
    LoginComponent,
    RegisterComponent
} from './components';

import { MaterialModule } from 'modules/material/material.module';

@NgModule({
    declarations: [
        DashboardComponent,
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        DashboardComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        AdminModuleRouting,
        CommonModule,
        FormsModule,
        MaterialModule
    ]
})
export class AdminModule { }
