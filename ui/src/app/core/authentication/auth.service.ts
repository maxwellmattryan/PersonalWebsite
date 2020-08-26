import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '@app/shared/interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    getAdmin(): string {
        return localStorage.getItem('username');
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('id') != undefined && localStorage.getItem('username') != undefined;
    }

    loginAdmin(id: number, username: string): void {
        localStorage.setItem('id', id.toString());
        localStorage.setItem('username', username);
    }

    logoutAdmin(): void {
        localStorage.clear();
    }
}
