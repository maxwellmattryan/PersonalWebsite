import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Admin, Blog } from '@app/shared/interfaces';
import { environment } from '@app/environments/environment';
import { Post, Profile, Topic } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) { }

    // ADMIN
    authenticateAdmin(admin: Admin): Observable<any> {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.post<any>(
            environment.API_URL + '/admin/auth',
            admin,
            { headers: headers }
        ).pipe(map(res => res));
    }

    registerAdmin(admin: Admin): Observable<any> {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.post(
            environment.API_URL + '/admin/register',
            admin,
            { headers: headers }
        ).pipe(map(res => res));
    }

    // POST
    deletePost(requestURL: string, headers: HttpHeaders): Observable<any> {
        return this.http.delete<any>(
            environment.API_URL + requestURL,
            { headers: headers }
        );
    }

    getPost(requestURL: string): Observable<Post> {
        return this.http.get<Post>(environment.API_URL + requestURL);
    }

    getBlog(): Observable<Blog> {
        return this.http.get<Blog>(environment.API_URL + '/blog');
    }

    putPost(post: Post, headers: HttpHeaders): Observable<Post> {
        return this.http.put<Post>(
            environment.API_URL + '/blog/posts/' + post['uri'],
            post,
            { headers: headers }
        );
    }

    // PROFILE
    getProfile(): Observable<Profile> {
        return this.http.get<Profile>(environment.API_URL);
    }

    // TOPIC
    getTopic(requestURL: string): Observable<Topic> {
        return this.http.get<Topic>(environment.API_URL + requestURL);
    }

    getTopics(): Observable<Topic[]> {
        return this.http.get<Topic[]>(environment.API_URL + '/blog/topics');
    }
}