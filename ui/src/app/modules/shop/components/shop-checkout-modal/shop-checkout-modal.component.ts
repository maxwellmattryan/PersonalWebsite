import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'ui-shop-checkout-modal',
    templateUrl: './shop-checkout-modal.component.html',
    styleUrls: ['./shop-checkout-modal.component.scss']
})
export class ShopCheckoutModalComponent implements OnInit {
    constructor(private readonly elem: ElementRef) { }

    ngOnInit(): void {
        this.elem.nativeElement.addEventListener('click', () => {
            this.close();
        });
    }

    public close(): void {
        let modal = document.getElementById('shop-checkout-modal');

        modal.classList.remove('show');
        modal.classList.add('hidden');
    }
}
