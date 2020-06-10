import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // TODO: implement admin model later and type this 
    admin: any;
    authToken: any;

    constructor(private httpClient: HttpClient) { }

    // ADMIN METHODS
    getAdmin(): string {
        this.loadAdminData();

        return this.admin.username;
    }

    getToken(): string {
        this.loadAdminData();

        return this.authToken;
    }

    isLoggedIn(): boolean {
        return JSON.parse(localStorage.getItem('loginStatus') || 'false');
    }

    // TODO: Write types and fix method return types for all of these
    authenticateAdmin(admin: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.httpClient.post<any>(environment.API_URL + '/admin/auth', admin, { headers: headers })
            .pipe(map((res: any) => { return res }));
    }

    logoutAdmin(): void {
        localStorage.clear();

        this.admin = null;
        this.authToken = null;
    }

    registerAdmin(admin) {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.httpClient.post(environment.API_URL + '/admin/register', admin, { headers: headers })
            .pipe(map((res: any) => { return res }));
    }

    loadAdminData(): void {
        const token = localStorage.getItem('id_token');
        const admin = JSON.parse(localStorage.getItem('admin'));

        this.authToken = token;
        this.admin = admin;
    }

    storeAdminData(token, admin): void {
        this.authToken = token;
        this.admin = admin;

        localStorage.setItem('admin', JSON.stringify(admin));
        localStorage.setItem('id_token', token);
        localStorage.setItem('loginStatus', 'true');
    }

    // EDITOR METHODS
    getAuthHeaders(): HttpHeaders {
        this.loadAdminData();

        return new HttpHeaders({
            'Authorization': this.authToken
        });
    }
}