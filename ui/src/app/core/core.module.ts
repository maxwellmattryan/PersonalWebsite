import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';

import {
    FooterComponent,
    HeaderComponent,
    IconComponent,
    LoadingSpinnerComponent
} from './components';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        IconComponent,
        LoadingSpinnerComponent,
        ModalComponent
    ],
    imports: [
        CommonModule,
        CoreRoutingModule
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        IconComponent,
        LoadingSpinnerComponent
    ]
})
export class CoreModule { }
