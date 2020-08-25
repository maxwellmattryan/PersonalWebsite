import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '@app/shared/interfaces';

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
            Authorization: this.authToken
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

        this.admin = undefined;
        this.authToken = undefined;
    }

    loadAdminData(): void {
        const token = localStorage.getItem('jwtToken');
        const admin = JSON.parse(localStorage.getItem('admin'));

        this.authToken = token;
        this.admin = admin;
    }

    storeAdminData(token: string, admin: Admin): void {
        this.authToken = token;
        this.admin = admin;

        localStorage.setItem('admin', JSON.stringify(admin));
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('loginStatus', 'true');
    }
}
