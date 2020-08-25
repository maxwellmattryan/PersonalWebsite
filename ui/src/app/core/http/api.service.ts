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
    registerAdmin(admin: Admin): Observable<any> {
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      return this.http.post(
        environment.API_URL + '/auth/register',
        admin,
        { headers }
      ).pipe(map(res => res));
    }

    logoutAdmin(): Observable<any> {
        return this.http.post<any>(environment.API_URL + '/auth/logout', {});
    }

    loginAdmin(admin: Admin): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.post<any>(
            environment.API_URL + '/auth/login',
            admin,
            { headers }
        ).pipe(map(res => res));
    }

    tryAuthTest(): Observable<any> {
      return this.http.get<any>(environment.API_URL + '/auth/test');
    }

    // HOMEPAGE
    getHomepage(): Observable<Homepage> {
        return this.http.get<Homepage>(environment.API_URL);
    }

    // POST
    deletePost(requestURL: string): Observable<any> {
        return this.http.delete<any>(
            environment.API_URL + requestURL
        );
    }

    getPost(requestURL: string): Observable<Post> {
        return this.http.get<Post>(environment.API_URL + requestURL);
    }

    getPosts(): Observable<Blog> {
        return this.http.get<Blog>(environment.API_URL + '/blog/posts');
    }

    putPost(post: Post): Observable<Post> {
        return this.http.put<Post>(
            environment.API_URL + '/blog/posts/' + post['uri'],
            post
        );
    }

    // PROJECT
    deleteProject(requestURL: string): Observable<any> {
        return this.http.delete<any>(environment.API_URL + requestURL);
    }

    getProject(requestURL: string): Observable<Project> {
        return this.http.get<Project>(environment.API_URL + requestURL);
    }

    putProject(project: Project): Observable<Project> {
        return this.http.put<Project>(
            environment.API_URL + '/projects/' + project['uri'],
            project
        );
    }

    // PROFILE
    getProfiles(): Observable<Profile[]> {
        return this.http.get<Profile[]>(environment.API_URL + '/profiles');
    }

    putProfile(profile: Profile): Observable<any> {
        return this.http.put<any>(
            environment.API_URL + '/profiles/' + profile['uri'],
            profile
        );
    }

    // TOPIC
    deleteTopic(requestURL: string): Observable<any> {
        return this.http.delete<any>(
            environment.API_URL + requestURL
        );
    }

    getTopics(): Observable<Topic[]> {
        return this.http.get<Topic[]>(environment.API_URL + '/blog/topics');
    }

    putTopic(topic: Topic): Observable<Topic> {
        return this.http.put<Topic>(
            environment.API_URL + '/blog/topics/' + topic['uri'],
            topic
        );
    }
}
