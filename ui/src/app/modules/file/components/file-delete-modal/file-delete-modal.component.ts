import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { ModalComponent } from '@ui/core/components/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';

import { FormBuilder, Validators } from '@angular/forms';

import { NotificationService, TrackingService } from '@ui/core/services';
import { FileApiService, FileService } from '../../services';
import { Buckets } from "@ui/modules/file/file.type";

@Component({
    selector: 'ui-file-delete-modal',
    templateUrl: './file-delete-modal.component.html',
    styleUrls: ['./file-delete-modal.component.scss']
})
export class FileDeleteModalComponent extends ModalComponent<string> {
    public isDeletingFile: boolean = false;

    /**
     * NOTE: The buckets and visibilities are both copied so that they are
     * accessible from the HTML template.
     */

    public buckets = Buckets;

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        protected readonly elem: ElementRef,
        protected readonly formBuilder: FormBuilder,
        private readonly fileApiService: FileApiService,
        private readonly fileService: FileService,
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
            bucket: this.formBuilder.control(Buckets[0], [Validators.required]),
            uri: this.formBuilder.control('', [Validators.required, Validators.pattern(pathRegex)]),
        });
    }

    public closeModal(): void {
        super.closeModal();

        this.resetModal();
    }

    public resetModal() {
        this.isDeletingFile = false;

        this.buildModalForm();

        this.changeDetectorRef.detectChanges();
    }

    public submitModalForm() {
        this.isDeletingFile = true;

        const { bucket, uri } = this.buildModalFormData();
        this.fileApiService.deleteFile(bucket, uri).subscribe((res: void) => {
            this.notificationService.createNotification('Successfully deleted existing file!');
            this.resetModal();
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
            this.isDeletingFile = false;
        });
    }

    private buildModalFormData(): { bucket: string, uri: string } {
        return {
            bucket: this.fileService.getBucketName(this.modalForm.value.bucket),
            uri: this.modalForm.value.uri
        };
    }
}
