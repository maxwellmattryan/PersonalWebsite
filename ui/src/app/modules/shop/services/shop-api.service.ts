import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@ui/environments/environment';
import { ApiService } from '@ui/core/http';
import { Id } from '@ui/core/models/model';

import { ShopCategory, ShopCustomer, ShopProduct, ShopProductStatus } from '../models';

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

    getCategories(): Observable<ShopCategory[]> {
        return this.http.get<ShopCategory[]>(`${environment.API_URL}/shop/categories`);
    }

    updateCategory(category: ShopCategory): Observable<ShopCategory> {
        const headers = this.contentTypeHeader();

        return this.http.put<ShopCategory>(
            `${environment.API_URL}/shop/categories/${category.id}`,
            category,
            { headers }
        );
    }

    deleteCategory(categoryId: Id): Observable<void> {
        return this.http.delete<void>(`${environment.API_URL}/shop/categories/${categoryId}`);
    }

    createProduct(product: ShopProduct): Observable<ShopProduct> {
        const headers = this.contentTypeHeader();

        return this.http.post<ShopProduct>(
            `${environment.API_URL}/shop/products`,
            product,
            { headers }
        );
    }

    // NOTE: statusId is set to 1 by default to correspond with 'AVAILABLE' products
    getProducts(statusId: Id = '', categoryId: Id = ''): Observable<ShopProduct[]> {
        let params = new HttpParams();
        if(statusId != '') params = params.set('statusId', <string>statusId);
        if(categoryId != '') params = params.set('categoryId', <string>categoryId);

        return this.http.get<ShopProduct[]>(
            `${environment.API_URL}/shop/products`,
            { params }
        );
    }

    getProductStatuses(): Observable<ShopProductStatus[]> {
        return this.http.get<ShopProductStatus[]>(`${environment.API_URL}/shop/product-statuses`);
    }

    updateProduct(product: ShopProduct): Observable<ShopProduct> {
        const headers = this.contentTypeHeader();

        return this.http.put<ShopProduct>(
            `${environment.API_URL}/shop/products/${product.id}`,
            product,
            { headers }
        );
    }

    deleteProduct(productId: Id, softDelete: boolean = true): Observable<void> {
        let params = new HttpParams();
        if(softDelete) params = params.set('doSoftDelete', 'true');

        return this.http.delete<void>(
            `${environment.API_URL}/shop/products/${productId}`,
            { params: params }
        );
    }

    helpCustomer(customerData: ShopCustomer): Observable<void> {
        const headers = this.contentTypeHeader();

        console.log(customerData);

        return this.http.post<void>(
            `${environment.API_URL}/shop/customers/help`,
            customerData,
            { headers }
        );
    }
}
