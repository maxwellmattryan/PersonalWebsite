import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments/environment';
import { Admin } from '@app/shared/interfaces';

import { ApiService } from '../http';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    // TODO: Fix the use of 'any' and just get rid of that

    public registerAdmin(admin: Admin): Observable<any> {
        const headers = this.contentTypeHeader();

        return this.http.post(
            `${environment.API_URL}/auth/register`,
            admin,
            { headers }
        );
    }

    public logoutAdmin(): Observable<any> {
        return this.http.post<any>(`${environment.API_URL}/auth/logout`, {});
    }

    public loginAdmin(admin: Admin): Observable<any> {
        const headers = this.contentTypeHeader();

        return this.http.post<any>(
            `${environment.API_URL}/auth/login`,
            admin,
            { headers }
        );
    }

    public tryAuthTest(): Observable<any> {
        return this.http.get<any>(`${environment.API_URL}/auth/test`);
    }
}