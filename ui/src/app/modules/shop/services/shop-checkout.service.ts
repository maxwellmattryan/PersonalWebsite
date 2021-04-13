import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { loadStripe } from '@stripe/stripe-js/pure';

import { environment } from '@ui/environments/environment';
import { ApiService } from '@ui/core/http';
import { Id } from '@ui/core/models/model';

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

    goToCheckout(productId: Id) {
        return this.getSession(productId).pipe(
            mergeMap((sessionId: string) =>
                this.redirectToCheckout(sessionId)
            )
        );
    }

    getSession(productId: Id): Observable<string> {
        let params = new HttpParams();
        params = params.set('productId', <string>productId);

        return this.http.get<{id: string}>(
            `${environment.API_URL}/shop/checkout/init`,
            { params: params }
        ).pipe(map(res => res.id));
    }

    redirectToCheckout(sessionId: string) {
        return this.stripe$.pipe(
            mergeMap(stripe =>
                stripe.redirectToCheckout({ sessionId })
            )
        );
    }

    completeCheckout(productId: Id, sessionId: string): Observable<ShopOrder> {
        let params = new HttpParams();
        params = params.set('productId', <string>productId);
        params = params.set('sessionId', sessionId);
        console.log(params);

        return this.http.post<ShopOrder>(
            `${environment.API_URL}/shop/checkout/complete`,
            { },
            { params: params }
        );
    }

    completeFreeCheckout(productId: Id, customerEmail: string): Observable<ShopOrder> {
        let params = new HttpParams();
        params = params.set('productId', <string>productId);
        params = params.set('isFreeProduct', 'true');

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
