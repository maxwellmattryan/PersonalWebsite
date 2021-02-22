import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { loadStripe } from '@stripe/stripe-js/pure';

import { environment } from '@ui/environments/environment';

import { ApiService } from '@ui/core/http';

import { ShopCustomer, ShopOrder, ShopProduct } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ShopCheckoutService extends ApiService {
    private customer: ShopCustomer;

    constructor(http: HttpClient) {
        super(http);
    }

    stripe$ = from(loadStripe(environment.STRIPE_PK));

    goToCheckout(productData: ShopProduct) {
        return this.getSession(productData).pipe(
            mergeMap((sessionId: string) =>
                this.redirectToCheckout(sessionId)
            )
        );
    }

    getSession(productData: ShopProduct): Observable<string> {
        const headers = this.contentTypeHeader();

        return this.http.post<{id: string}>(
            `${environment.API_URL}/shop/checkout/init`,
            productData,
            { headers }
        ).pipe(map(res => res.id));
    }

    redirectToCheckout(sessionId: string) {
        return this.stripe$.pipe(
            mergeMap(stripe =>
                stripe.redirectToCheckout({ sessionId })
            )
        );
    }

    // completeCheckout(): Observable<ShopOrder> {
    //     return this.http.post<ShopOrder>(
    //         `${environment.API_URL}/shop/checkout/complete`
    //
    //     );
    // }

    completeFreeCheckout(productId: number, customerEmail: string): Observable<ShopOrder> {
        let params = new HttpParams();
        params = params.set('productId', productId.toString());
        params = params.set('freeProduct', 'true');

        return this.http.post<ShopOrder>(
            `${environment.API_URL}/shop/checkout/complete`,
        { email: customerEmail },
            { params: params }
        );
    }

    getCustomer(): ShopCustomer {
        return this.customer;
    }

    setCustomer(customerData: ShopCustomer): void {
        this.customer = customerData;
    }
}
