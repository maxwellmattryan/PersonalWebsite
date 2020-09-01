import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Admin } from '@app/shared/interfaces';
import { environment } from '@app/environments/environment';
import { BlogPost, Project, Profile, BlogTopic, BlogPostStatus, BlogAuthor } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private http: HttpClient
    ) { }

    // ========
    // UTILS
    // ========
    formatUri(raw: string): string {
        return raw.toLowerCase().replace(/[ ]/g, '-').replace(/[\.?]/g, '');
    }

    // ========
    // ADMIN
    // ========
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

    // ========
    // HOME
    // ========
    getHomepage(): Observable<any> {
        return this.http.get<any>(`${environment.API_URL}/homepage`);
    }

    // ========
    // BLOG
    // ========
    getBlogAuthors(): Observable<BlogAuthor[]> {
        return this.http.get<BlogAuthor[]>(`${environment.API_URL}/blog/authors`);
    }

    createPost(post: BlogPost): Observable<BlogPost> {
        return this.http.post<BlogPost>(
            `${environment.API_URL}/blog/posts`,
            post
        );
    }

    deletePost(requestURL: string): Observable<any> {
        return this.http.delete<any>(
            environment.API_URL + requestURL
        );
    }

    getPost(uri: string): Observable<BlogPost> {
        return this.http.get<BlogPost>(environment.API_URL + uri);
    }

    getPosts(topicId: number = -1, publishedOnly: boolean = true): Observable<BlogPost[]> {
        let params = new HttpParams();

        if(topicId != -1) params = params.set('topic_id', topicId.toString());
        if(publishedOnly) params = params.set('published', 'true');

        return this.http.get<BlogPost[]>(
            `${environment.API_URL}/blog/posts`,
            { params: params }
        );
    }

    getPostStatuses(): Observable<BlogPostStatus[]> {
        return this.http.get<BlogPostStatus[]>(`${environment.API_URL}/blog/posts/statuses`);
    }

    updatePost(post: BlogPost): Observable<BlogPost> {
        return this.http.put<BlogPost>(
            `${environment.API_URL}/blog/posts/${post.id}`,
            post
        );
    }

    createTopic(topic: BlogTopic): Observable<BlogTopic> {
        return this.http.post<BlogTopic>(
            `${environment.API_URL}/blog/topics`,
            topic
        );
    }

    deleteTopic(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.API_URL}/blog/topics/${id}`);
    }

    getTopics(): Observable<BlogTopic[]> {
        return this.http.get<BlogTopic[]>(environment.API_URL + '/blog/topics');
    }

    updateTopic(topic: BlogTopic): Observable<BlogTopic> {
        return this.http.put<BlogTopic>(
            `${environment.API_URL}/blog/topics/${topic.id}`,
            topic
        );
    }

    // ========
    // PROJECT
    // ========
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
        return this.http.get<Project>(environment.API_URL + uri);
    }

    updateProject(project: Project, associatedProfileIds: number[]): Observable<Project> {
        return this.http.put<Project>(
            `${environment.API_URL}/projects/${project.id}`,
            { project: project, profile_ids: associatedProfileIds }
        );
    }

    // ========
    // PROFILE
    // ========
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
}
