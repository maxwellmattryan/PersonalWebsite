import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@app/environments/environment';
import {
    BlogPost,
    BlogTopic,
    BlogPostStatus,
    BlogAuthor,
} from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(protected http: HttpClient) { }

    protected contentTypeHeader(contentType: string = 'application/json'): HttpHeaders {
        const headers = new HttpHeaders();
        headers.set('Content-Type', contentType);

        return headers;
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
}