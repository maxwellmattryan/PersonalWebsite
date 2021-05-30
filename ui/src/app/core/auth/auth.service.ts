import { Injectable } from '@angular/core';

import { Id } from '@ui/core/models/model';

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

    loginAdmin(id: Id, username: string): void {
        localStorage.setItem('id', <string>id);
        localStorage.setItem('username', username);
    }

    logoutAdmin(): void {
        localStorage.clear();
    }
}
