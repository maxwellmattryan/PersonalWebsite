import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    exports: [
        CheckboxModule,
        CommonModule,
        RadioButtonModule
    ]
})
export class PrimeNgModule { }