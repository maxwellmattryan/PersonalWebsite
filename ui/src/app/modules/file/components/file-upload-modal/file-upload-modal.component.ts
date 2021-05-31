import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { ModalComponent } from '@ui/core/components/modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import {NotificationService, TrackingService} from '@ui/core/services';
import { FileResponse } from '@ui/modules/file/services/file-api.service';

import { FileApiService } from '../../services';

import { Buckets, BucketVisibilities } from "@ui/modules/file/file.type";
import { FileService } from "@ui/modules/file/services/file.service";

export type FileData = {
    file: File,
    bucket: string,
    visibility: string,
    dir: string
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

    /**
     * NOTE: The buckets and visibilities are both copied so that they are
     * accessible from the HTML template.
     */

    public buckets = Buckets;
    public visibilities = BucketVisibilities;

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        protected readonly elem: ElementRef,
        private readonly fileApiService: FileApiService,
        private readonly fileService: FileService,
        protected readonly formBuilder: FormBuilder,
        private readonly notificationService: NotificationService,
        public readonly trackingService: TrackingService
    ) {
        super(elem, formBuilder);
    }

    ngOnInit(): void {
        this.buildModalForm();
    }

    protected buildModalForm(): void {
        const pathRegex: RegExp = /^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))+/;

        this.modalForm = this.formBuilder.group({
            file: this.formBuilder.control('', [Validators.required]),
            type: this.formBuilder.control(Buckets[0], [Validators.required]),
            visibility: this.formBuilder.control(BucketVisibilities[0], [Validators.required]),
            dir: this.formBuilder.control('', [Validators.required, Validators.pattern(pathRegex)])
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

        this.changeDetectorRef.detectChanges();
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

        this.fileApiService.uploadFile(formData, fileData).subscribe((res: FileResponse) => {
            this.notificationService.createNotification('Successfully uploaded new file!', 'file', 30000, res.url);
            this.resetModal();
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
            this.isUploadingFile = false;
            this.changeDetectorRef.detectChanges();
        });
    }

    private buildModalFormData(): FileData {
        return {
            file: this.file,
            bucket: this.fileService.getBucketName(this.modalForm.value.type),
            visibility: this.fileService.getBucketVisibility(this.modalForm.value.visibility),
            dir: this.modalForm.value.dir
        }
    }

    public filename(): string {
        return this.file ? this.file.name : 'Select File'
    };
}
