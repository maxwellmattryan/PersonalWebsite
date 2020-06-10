import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

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
        AdminRoutingModule,
        CommonModule,
        FormsModule,
        MaterialModule
    ]
})
export class AdminModule { }