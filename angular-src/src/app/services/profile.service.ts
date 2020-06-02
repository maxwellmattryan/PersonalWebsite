import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Project, Post } from '../models';

interface Profile {
    _id: string;
    uri: string;
    name: string;
    tagline: string;
    about: string;
    technologies: Array<object>;
    projects: Array<Project>;
    posts: Array<Post>
}

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private httpClient: HttpClient) { }

    getProfileData(): Observable<Profile> {
        return this.httpClient.get<Profile>(environment.API_URL);
    }
}
