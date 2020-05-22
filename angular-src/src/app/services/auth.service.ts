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

    rootUrl: string = 'http://localhost:3000/';
    authenticationUrl: string = this.rootUrl + 'admin/authenticate';
    registrationUrl: string = this.rootUrl + 'admin/register';
    postsUrl: string = this.rootUrl + 'blog/posts';

    constructor(private httpClient: HttpClient) { }

    isAdmin() {
        const token = localStorage.getItem('id_token');
        return token != null
    }

    authenticateAdmin(admin) {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.httpClient.post(this.authenticationUrl, admin, { headers: headers })
            .pipe(map((res: any) => { return res; }));
    }

    logoutAdmin() {
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

    createPost(post) {
        this.loadToken();

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', this.authToken);

        return this.httpClient.post(this.postsUrl, post, { headers: headers })
            .pipe(map((res: any) => { return res; }));
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }
}
