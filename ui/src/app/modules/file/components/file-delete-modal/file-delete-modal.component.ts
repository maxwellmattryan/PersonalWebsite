import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { ModalComponent } from '@ui/core/components/modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '@ui/core/services';

import { FileApiService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'ui-file-delete-modal',
    templateUrl: './file-delete-modal.component.html',
    styleUrls: ['./file-delete-modal.component.scss']
})
export class FileDeleteModalComponent extends ModalComponent<string> {
    public isDeletingFile: boolean = false;

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        protected readonly elem: ElementRef,
        protected readonly formBuilder: FormBuilder,
        private readonly fileService: FileApiService,
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

        const uri = this.buildModalFormData();
        this.fileService.deleteFile(uri).subscribe((res: void) => {
            this.notificationService.createNotification('Successfully deleted existing file!');
            this.resetModal();
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
            this.isDeletingFile = false;
        });
    }

    private buildModalFormData(): string {
        return this.modalForm.value.uri;
    }
}
