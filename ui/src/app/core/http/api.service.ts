import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Admin, Blog, Homepage } from '@app/shared/interfaces';
import { environment } from '@app/environments/environment';
import { Post, Project, Profile, Topic } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) { }

    // ADMIN
    loginAdmin(admin: Admin): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.post<any>(
            environment.ROOT_URL + '/admin/login',
            admin,
            { headers }
        ).pipe(map(res => res));
    }

    registerAdmin(admin: Admin): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.post(
            environment.ROOT_URL + '/admin/register',
            admin,
            { headers }
        ).pipe(map(res => res));
    }

    // HOMEPAGE
    getHomepage(): Observable<Homepage> {
        return this.http.get<Homepage>(environment.API_URL);
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

    getPosts(): Observable<Blog> {
        return this.http.get<Blog>(environment.API_URL + '/blog/posts');
    }

    putPost(post: Post, headers: HttpHeaders): Observable<Post> {
        return this.http.put<Post>(
            environment.API_URL + '/blog/posts/' + post['uri'],
            post,
            { headers: headers }
        );
    }

    // PROJECT
    deleteProject(requestURL: string, headers: HttpHeaders): Observable<any> {
        return this.http.delete<any>(
            environment.API_URL + requestURL,
            { headers: headers }
        );
    }

    getProject(requestURL: string): Observable<Project> {
        return this.http.get<Project>(environment.API_URL + requestURL);
    }

    putProject(project: Project, headers: HttpHeaders): Observable<Project> {
        return this.http.put<Project>(
            environment.API_URL + '/projects/' + project['uri'],
            project,
            { headers: headers }
        );
    }

    // PROFILE
    getProfiles(): Observable<Profile[]> {
        return this.http.get<Profile[]>(environment.API_URL + '/profiles');
    }

    putProfile(profile: Profile, headers: HttpHeaders): Observable<any> {
        return this.http.put<any>(
            environment.API_URL + '/profiles/' + profile['uri'],
            profile,
            { headers: headers }
        );
    }

    // TOPIC
    deleteTopic(requestURL: string, headers: HttpHeaders): Observable<any> {
        return this.http.delete<any>(
            environment.API_URL + requestURL,
            { headers: headers }
        );
    }

    getTopics(): Observable<Topic[]> {
        return this.http.get<Topic[]>(environment.API_URL + '/blog/topics');
    }

    putTopic(topic: Topic, headers: HttpHeaders): Observable<Topic> {
        return this.http.put<Topic>(
            environment.API_URL + '/blog/topics/' + topic['uri'],
            topic,
            { headers: headers }
        );
    }
}
