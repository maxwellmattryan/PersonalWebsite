import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { ModalComponent } from '@ui/core/components/modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationService } from '@ui/core/services';

import { FileService } from '../../services';

export type FileData = {
    file: File,
    folder: string
};

@Component({
    selector: 'ui-file-upload-modal',
    templateUrl: './file-upload-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadModalComponent extends ModalComponent<File> {
    public isSelectingFile: boolean = false;
    public isUploadingFile: boolean = false;

    private file: File;

    constructor(
        protected readonly elem: ElementRef,
        private readonly fileService: FileService,
        protected readonly formBuilder: FormBuilder,
        private readonly notificationService: NotificationService
    ) {
        super(elem, formBuilder);
    }

    ngOnInit(): void {
        this.buildModalForm();
    }

    protected buildModalForm(): void {
        const pathRegex: RegExp = /^(?!\/)(?!.*(?:^|\/)\.\.\/).+/;

        this.modalForm = this.formBuilder.group({
            file: this.formBuilder.control('', [Validators.required]),
            folder: this.formBuilder.control('', [Validators.required, Validators.pattern(pathRegex)])
        });
    }

    public closeModal(): void {
        super.closeModal();

        this.resetModal();
    }

    public resetModal() {
        this.isSelectingFile = false;
        this.isUploadingFile = false;

        this.file = undefined;

        this.buildModalForm();
    }

    public selectFile(elem: HTMLElement): void {
        (<HTMLInputElement>elem).click();
    }

    public changeFilename(event: Event): void {
        this.file = (event.target as any).files[0];
    }

    public submitModalForm(): void {
        if(!this.file) return;

        this.isUploadingFile = true;

        const fileData: FileData = this.buildModalFormData();
        const formData = new FormData();
        formData.append('file', fileData.file, fileData.file.name);

        this.fileService.uploadFile(formData, fileData).subscribe((res: void) => {
            this.isUploadingFile = false;
            console.log(res);
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
            this.isUploadingFile = false;
        });
    }

    private buildModalFormData(): FileData {
        return {
            file: this.file,
            folder: this.modalForm.value.folder
        }
    }

    public filename(): string {
        return this.file ? this.file.name : 'Select All'
    };
}
