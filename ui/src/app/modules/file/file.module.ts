import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from "@ui/modules";

import { ReactiveFormsModule } from '@angular/forms';

import { FileUploadModalComponent } from './components';
import { FileApiService } from './services';
import { FileDeleteModalComponent } from './components/file-delete-modal/file-delete-modal.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
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
        FileApiService
    ]
})
export class FileModule { }
