import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FileUploadModalComponent } from './components';

import { FileService } from './services';
import { FileDeleteModalComponent } from './components/file-delete-modal/file-delete-modal.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        FileUploadModalComponent,
        FileDeleteModalComponent
    ],
    declarations: [
        FileUploadModalComponent,
        FileDeleteModalComponent
    ],
    providers: [
        FileService
    ]
})
export class FileModule { }
