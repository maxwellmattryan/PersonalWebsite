import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    template: ``,
    // NOTE: The styling is located in the root source dir, in '_modal.scss'
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent<T> implements OnInit {
    @Input()
    public modalId: string = '';

    @Output()
    public modalEvent = new EventEmitter<T>();

    public modalForm: FormGroup;

    constructor(
        protected readonly elem: ElementRef,
        protected readonly formBuilder: FormBuilder
    ) { }

    ngOnInit(): void { }

    protected buildModalForm(): void { }

    public closeModal(): void {
        let modal = document.getElementById(this.modalId);

        modal.classList.remove('show');
        modal.classList.add('hidden');
    }

    public submitModalForm(): void { }
}
