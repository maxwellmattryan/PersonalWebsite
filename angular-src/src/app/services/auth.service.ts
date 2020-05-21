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
    registrationUrl: string = 'http://localhost:3000/admin/register';

    constructor(private httpClient: HttpClient) { }

    registerAdmin(admin) {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.httpClient.post(this.registrationUrl, admin, { headers: headers })
            .pipe(map((data: any) => { return data; }));
    }
}
