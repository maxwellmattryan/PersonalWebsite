import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    admin: any;
    authToken: any;
    authenticationUrl: string = 'http://localhost:3000/admin/authenticate';
    registrationUrl: string = 'http://localhost:3000/admin/register';

    constructor(private httpClient: HttpClient) { }

    authenticateAdmin(admin) {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.httpClient.post(this.authenticationUrl, admin, { headers: headers })
            .pipe(map((res: any) => { return res; }));
    }

    logout() {
        this.admin = null;
        this.authToken = null;

        localStorage.clear();
    }

    registerAdmin(admin) {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.httpClient.post(this.registrationUrl, admin, { headers: headers })
            .pipe(map((res: any) => { return res; }));
    }

    storeAdminData(token, admin) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('admin', JSON.stringify(admin));

        this.admin = admin;
        this.authToken = token;
    }
}
