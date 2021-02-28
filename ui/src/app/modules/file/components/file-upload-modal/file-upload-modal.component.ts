import { ChangeDetectionStrategy, Component, ElementRef, OnChanges } from '@angular/core';
import { ModalComponent } from '@ui/core/components/modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms';

export type FileData = {
    filename: string,
    uri: string
};

@Component({
    selector: 'ui-file-upload-modal',
    templateUrl: './file-upload-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadModalComponent extends ModalComponent<File> {
    public filename: string = 'Select File';

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
        const pathRegex: RegExp = /^[^/].*/;

        this.modalForm = this.formBuilder.group({
            file: this.formBuilder.control('', [Validators.required]),
            uri: this.formBuilder.control('', [Validators.required, Validators.pattern(pathRegex)])
        });
    }

    public selectFile(elem: HTMLElement): void {
        (<HTMLInputElement>elem).click();
    }

    public changeFilename(event: Event): void {
        const match = this.extractFilenameFromPath((<HTMLInputElement>event.target).value);

        let filename: string;
        if(match)
            filename = match.length > 21 ? `${match.substring(0, 18)}...` : match;
        else
            filename = 'unknown';

        this.filename = filename;
    }

    private extractFilenameFromPath(path: string): string {
        const filenameRegex = /[^\\]*$/;
        return path.match(filenameRegex)[0];
    }

    public submitModalForm(): void {
        const data: FileData = this.buildModalFormData();
        console.log(data);

        const formData = new FormData();
        formData.append(data.filename, this.modalForm.get('file').value);
        console.log(formData);

        // TODO: Get the actual data from the file
    }

    private buildModalFormData(): FileData {
        return {
            filename: this.extractFilenameFromPath(this.modalForm.value.file),
            uri: this.modalForm.value.uri
        }
    }
}
