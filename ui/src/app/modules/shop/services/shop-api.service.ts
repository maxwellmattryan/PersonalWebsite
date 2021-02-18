import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@ui/environments/environment';

import { ApiService } from '@ui/core/http';

import { ShopProduct, ShopProductStatus } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ShopApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    getShop(): Observable<string> {
        return this.http.get<string>(
            `${environment.API_URL}/shop`,
            {},
        );
    }

    getProducts(status: string = ''): Observable<ShopProduct[]> {
        let params = new HttpParams();
        if(status != '') params = params.set('status', status);

        return this.http.get<ShopProduct[]>(
            `${environment.API_URL}/shop/products`,
            { params: params }
        );
    }

    // update product

    deleteProduct(productId: number, softDelete: boolean = true): Observable<void> {
        let params = new HttpParams();
        if(softDelete) params = params.set('softDelete', 'true');

        return this.http.delete<void>(
            `${environment.API_URL}/shop/products/${productId}`,
            { params: params }
        );
    }
}
