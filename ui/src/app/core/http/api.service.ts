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

    formatUri(raw: string): string {
        return raw.toLowerCase().replace(/[ ]/g, '-').replace(/[\.?]/g, '');
    }

    // ADMIN
    registerAdmin(admin: Admin): Observable<any> {
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      return this.http.post(
        `${environment.API_URL}/auth/register`,
        admin,
        { headers }
      ).pipe(map(res => res));
    }

    logoutAdmin(): Observable<any> {
        return this.http.post<any>(`${environment.API_URL}/auth/logout`, {});
    }

    loginAdmin(admin: Admin): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.post<any>(
            `${environment.API_URL}/auth/login`,
            admin,
            { headers }
        ).pipe(map(res => res));
    }

    tryAuthTest(): Observable<any> {
      return this.http.get<any>(`${environment.API_URL}/auth/test`);
    }

    // HOMEPAGE
    getHomepage(): Observable<any> {
        return this.http.get<any>(`${environment.API_URL}/homepage`);
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
    createProject(project: Project, associatedProfileIds: number[]): Observable<Project> {
        return this.http.post<Project>(
            `${environment.API_URL}/projects`,
            { project: project, profile_ids: associatedProfileIds }
        );
    }

    deleteProject(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.API_URL}/projects/${id}`);
    }

    getProject(uri: string): Observable<Project> {
        return this.http.get<Project>(`${environment.API_URL}${uri}`);
    }

    updateProject(project: Project, associatedProfileIds: number[]): Observable<Project> {
        return this.http.put<Project>(
            `${environment.API_URL}/projects/${project.id}`,
            { project: project, profile_ids: associatedProfileIds }
        );
    }

    // PROFILE
    activateProfile(profileId: number): Observable<Profile> {
        return this.http.put<Profile>(
            `${environment.API_URL}/profiles/${profileId}/activate`,
            {}
        );
    }

    getProfiles(): Observable<Profile[]> {
        return this.http.get<Profile[]>(environment.API_URL + '/profiles');
    }

    getProfilesForProject(projectId: number): Observable<any> {
        return this.http.get<any>(`${environment.API_URL}/projects/${projectId}/profiles`)
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
