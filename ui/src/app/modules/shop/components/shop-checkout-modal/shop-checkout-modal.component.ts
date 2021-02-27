import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShopCustomer } from '../../models';

@Component({
    selector: 'ui-shop-checkout-modal',
    templateUrl: './shop-checkout-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopCheckoutModalComponent implements OnInit {
    @Input()
    public modalId: string = '';

    @Output()
    public customerEvent = new EventEmitter<ShopCustomer>();

    public checkoutForm: FormGroup;

    constructor(
        private readonly elem: ElementRef,
        private readonly formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.buildCheckoutForm();
    }

    public close(): void {
        let modal = document.getElementById(this.modalId);

        modal.classList.remove('show');
        modal.classList.add('hidden');
    }

    private buildCheckoutForm(): void {
        this.checkoutForm = this.formBuilder.group({
            email: this.formBuilder.control('', [Validators.required, Validators.email])
        });
    }

    public onSubmit(): void {
        const customer = this.buildCustomer();
        this.customerEvent.emit(customer);
    }

    private buildCustomer(): any {
        return new ShopCustomer({
            ...this.checkoutForm.value
        });
    }
}
