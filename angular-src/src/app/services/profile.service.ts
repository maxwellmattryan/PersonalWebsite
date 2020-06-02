import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Profile } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private httpClient: HttpClient) { }

    getProfileData(): Observable<Profile> {
        return this.httpClient.get<Profile>(environment.API_URL);
    }
}
