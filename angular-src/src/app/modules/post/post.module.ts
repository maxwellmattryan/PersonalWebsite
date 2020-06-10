import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import FormsModule to get access to [(ngModel)] if needed...

import {
    PostComponent,
    PostContainerComponent
} from './components';

@NgModule({
    declarations: [
        PostComponent,
        PostContainerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        PostComponent,
        PostContainerComponent
    ]
})
export class PostModule { }