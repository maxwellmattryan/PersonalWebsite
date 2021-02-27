import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { ModalComponent } from '@ui/core/components/modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'ui-file-upload-modal',
    templateUrl: './file-upload-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadModalComponent extends ModalComponent<File> {
    constructor(
        protected readonly elem: ElementRef,
        protected readonly formBuilder: FormBuilder
    ) {
        super(elem, formBuilder);
    }

    ngOnInit(): void {
        this.buildModalForm();
    }

    protected buildModalForm(): void {
        const pathRegex: RegExp = /^[^\/]+\/?(?:[^\/]+\/?)*$/;

        this.modalForm = this.formBuilder.group({
            file: this.formBuilder.control('', [Validators.required]),
            uri: this.formBuilder.control('', [Validators.required, Validators.pattern(pathRegex)])
        });
    }

    public submitModalForm(): void { }
}
