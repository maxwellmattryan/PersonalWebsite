import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@ui/environments/environment';

@Injectable({
    providedIn: 'root'
})
export abstract class ApiService {
    protected constructor(protected http: HttpClient) { }

    protected contentTypeHeader(contentType: string = 'application/json'): HttpHeaders {
        const headers = new HttpHeaders();
        headers.set('Content-Type', contentType);

        return headers;
    }
}