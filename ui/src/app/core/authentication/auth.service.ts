import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // TODO: implement admin model later and type this 
    admin: any;
    authToken: any;

    constructor() { }

    getAdmin(): string {
        this.loadAdminData();

        return this.admin.username;
    }

    getAuthHeaders(): HttpHeaders {
        this.loadAdminData();

        return new HttpHeaders({
            'Authorization': this.authToken
        });
    }

    getToken(): string {
        this.loadAdminData();

        return this.authToken;
    }

    isLoggedIn(): boolean {
        return JSON.parse(localStorage.getItem('loginStatus') || 'false');
    }

    logoutAdmin(): void {
        localStorage.clear();

        this.admin = null;
        this.authToken = null;
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
}
