import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@ui/environments/environment';
import { ApiService } from '@ui/core/http';

import { Homepage } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HomeApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    getHomepage(): Observable<Homepage> {
        return this.http.get<Homepage>(`${environment.API_URL}/home`);
    }
}
