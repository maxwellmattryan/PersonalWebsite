import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Topic } from '../models/topic.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // TODO: implement admin model later and type this 
    admin: any;
    authToken: any;

    constructor(private httpClient: HttpClient) { }

    // ADMIN METHODS
    getAdmin(): String {
        return this.admin;
    }

    getToken(): String {
        return this.authToken;
    }

    isLoggedIn(): Boolean {
        this.loadAdminData();
        return this.authToken != null;
    }

    registerAdmin(admin) {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.httpClient.post(environment.API_URL + '/admin/register', admin, { headers: headers })
            .pipe(map((res: any) => { return res }));
    }

    authenticateAdmin(admin) {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.httpClient.post(environment.API_URL + '/admin/auth', admin, { headers: headers })
            .pipe(map((res: any) => { return res }));
    }

    logoutAdmin(): void {
        this.admin = null;
        this.authToken = null;

        localStorage.clear();
    }

    storeAdminData(token, admin): void {
        this.authToken = token;
        this.admin = admin;

        localStorage.setItem('id_token', token);
        localStorage.setItem('admin', JSON.stringify(admin));
    }

    loadAdminData(): void {
        const token = localStorage.getItem('id_token');
        const admin = JSON.parse(localStorage.getItem('admin'));

        this.authToken = token;
        this.admin = admin;
    }

    // EDITOR METHODS
    getAuthHeaders(): HttpHeaders {
        this.loadAdminData();

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.authToken
        });
    }
}
