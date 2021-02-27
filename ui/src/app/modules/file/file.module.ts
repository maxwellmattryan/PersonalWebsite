import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FileUploadModalComponent } from './components';

import { FileService } from './services';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        FileUploadModalComponent
    ],
    declarations: [
        FileUploadModalComponent
    ],
    providers: [
        FileService
    ]
})
export class FileModule { }
