import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModalComponent } from './components';

import { FileService } from './services';

@NgModule({
    imports: [
        CommonModule
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
