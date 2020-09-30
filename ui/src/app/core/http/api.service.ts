import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Admin } from '@app/shared/interfaces';
import { environment } from '@app/environments/environment';
import {
    BlogPost,
    BlogTopic,
    BlogPostStatus,
    BlogAuthor,
} from '@app/shared/models';
import {
    PortfolioProject,
    PortfolioProfile,
    PortfolioProfileStatus,
    PortfolioProfileTechnology
} from '@app/modules/portfolio/models';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private http: HttpClient
    ) { }

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

    deletePost(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.API_URL}/blog/posts/${id}`);
    }

    getPost(id: number): Observable<BlogPost> {
        return this.http.get<BlogPost>(`${environment.API_URL}/blog/posts/${id}`);
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
        return this.http.get<BlogTopic[]>(`${environment.API_URL}/blog/topics`);
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
    createProject(project: PortfolioProject): Observable<PortfolioProject> {
        return this.http.post<PortfolioProject>(
            `${environment.API_URL}/portfolio/projects`,
            project
        );
    }

    deleteProject(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.API_URL}/portfolio/projects/${id}`);
    }

    getProject(id: number): Observable<PortfolioProject> {
        return this.http.get<PortfolioProject>(`${environment.API_URL}/portfolio/projects/${id}`);
    }

    getProjects(): Observable<PortfolioProject[]> {
        return this.http.get<PortfolioProject[]>(`${environment.API_URL}/portfolio/projects`);
    }

    updateProject(project: PortfolioProject): Observable<PortfolioProject> {
        return this.http.put<PortfolioProject>(
            `${environment.API_URL}/portfolio/projects/${project.id}`,
            project
        );
    }

    // ========
    // PROFILE
    // ========
    activateProfile(profileId: number): Observable<PortfolioProfile> {
        return this.http.put<PortfolioProfile>(
            `${environment.API_URL}/portfolio/profiles/${profileId}/activate`,
            {}
        );
    }

    createProfile(profile: PortfolioProfile): Observable<PortfolioProfile> {
        return this.http.post<PortfolioProfile>(
            `${environment.API_URL}/portfolio/profiles`,
            profile
        );
    }

    deleteProfile(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.API_URL}/portfolio/profiles/${id}`)
    }

    getProfiles(): Observable<PortfolioProfile[]> {
        return this.http.get<PortfolioProfile[]>(`${environment.API_URL}/portfolio/profiles`);
    }

    getProfileStatuses(): Observable<PortfolioProfileStatus[]> {
        return this.http.get<PortfolioProfileStatus[]>(`${environment.API_URL}/portfolio/profiles/statuses`);
    }

    getProfileTechnologies(id: number): Observable<PortfolioProfileTechnology[]> {
        return this.http.get<PortfolioProfileTechnology[]>(`${environment.API_URL}/portfolio/profiles/${id}/technologies`);
    }

    updateProfile(profile: PortfolioProfile): Observable<PortfolioProfile> {
        return this.http.put<PortfolioProfile>(
            `${environment.API_URL}/portfolio/profiles/${profile.id}`,
            profile
        )
    }
}

