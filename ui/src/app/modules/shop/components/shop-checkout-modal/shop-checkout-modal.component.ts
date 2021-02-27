import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ShopCustomer } from '../../models';
import { ModalComponent } from '@ui/core/components/modal/modal.component';

@Component({
    selector: 'ui-shop-checkout-modal',
    templateUrl: './shop-checkout-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopCheckoutModalComponent extends ModalComponent<ShopCustomer> {
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
        this.modalForm = this.formBuilder.group({
            email: this.formBuilder.control('', [Validators.required, Validators.email])
        });
    }

    public submitModalForm(): void {
        const customer = this.buildCustomer();
        this.modalEvent.emit(customer);
    }

    private buildCustomer(): any {
        return new ShopCustomer({
            ...this.modalForm.value
        });
    }
}
