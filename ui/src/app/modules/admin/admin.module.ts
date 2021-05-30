import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CoreModule } from '@ui/core/core.module';

import { FileModule } from '@ui/modules/file/file.module';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

import {
    DashboardViewComponent,
    LoginViewComponent,
    RegisterViewComponent
} from './components';

@NgModule({
    declarations: [
        AdminComponent,
        DashboardViewComponent,
        LoginViewComponent,
        RegisterViewComponent
    ],
    imports: [
        AdminRoutingModule,
        CommonModule,
        CoreModule,
        FileModule,
        FormsModule
    ]
})
export class AdminModule { }