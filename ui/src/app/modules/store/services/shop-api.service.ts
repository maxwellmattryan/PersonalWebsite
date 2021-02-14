import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@ui/environments/environment';
import { ApiService } from '@ui/core/http';

@Injectable({
  providedIn: 'root'
})
export class ShopApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    getStore(): Observable<string> {
        return this.http.get<string>(
            `${environment.API_URL}/store`,
            {},
        );
    }
}
