import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@ui/environments/environment';

import { ApiService } from '@ui/core/http';

import { ShopCategory, ShopProduct, ShopProductStatus } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ShopApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    createCategory(category: ShopCategory): Observable<ShopCategory> {
        const headers = this.contentTypeHeader();

        return this.http.post<ShopCategory>(
            `${environment.API_URL}/shop/categories`,
            category,
            { headers }
        );
    }

    createProduct(product: ShopProduct): Observable<ShopProduct> {
        const headers = this.contentTypeHeader();

        return this.http.post<ShopProduct>(
            `${environment.API_URL}/shop/products`,
            product,
            { headers }
        );
    }

    getCategories(): Observable<ShopCategory[]> {
        return this.http.get<ShopCategory[]>(`${environment.API_URL}/shop/categories`);
    }

    getProducts(status: string = '', exclude: string = ''): Observable<ShopProduct[]> {
        let params = new HttpParams();
        if(status != '')
            params = params.set('status', status);
        else if(exclude != '')
            params = params.set('exclude', exclude);

        return this.http.get<ShopProduct[]>(
            `${environment.API_URL}/shop/products`,
            { params }
        );
    }

    getProductStatuses(): Observable<ShopProductStatus[]> {
        return this.http.get<ShopProductStatus[]>(`${environment.API_URL}/shop/product-statuses`);
    }

    updateCategory(category: ShopCategory): Observable<ShopCategory> {
        const headers = this.contentTypeHeader();

        return this.http.put<ShopCategory>(
            `${environment.API_URL}/shop/categories/${category.id}`,
            category,
            { headers }
        );
    }

    updateProduct(product: ShopProduct): Observable<ShopProduct> {
        const headers = this.contentTypeHeader();

        return this.http.put<ShopProduct>(
            `${environment.API_URL}/shop/products/${product.id}`,
            product,
            { headers }
        );
    }

    deleteProduct(productId: number, softDelete: boolean = true): Observable<void> {
        let params = new HttpParams();
        if(softDelete) params = params.set('softDelete', 'true');

        return this.http.delete<void>(
            `${environment.API_URL}/shop/products/${productId}`,
            { params: params }
        );
    }
}
