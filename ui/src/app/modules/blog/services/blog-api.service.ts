import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@ui/environments/environment';
import { ApiService } from '@ui/core/http';

import { BlogAuthor, BlogPost, BlogPostStatus, BlogTopic } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BlogApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    getBlogAuthors(): Observable<BlogAuthor[]> {
        return this.http.get<BlogAuthor[]>(`${environment.API_URL}/blog/authors`);
    }

    createPost(post: BlogPost): Observable<BlogPost> {
        const headers = this.contentTypeHeader();

        return this.http.post<BlogPost>(
            `${environment.API_URL}/blog/posts`,
            post,
            { headers }
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
        const headers = this.contentTypeHeader();

        return this.http.put<BlogPost>(
            `${environment.API_URL}/blog/posts/${post.id}`,
            post,
            { headers }
        );
    }

    createTopic(topic: BlogTopic): Observable<BlogTopic> {
        const headers = this.contentTypeHeader();

        return this.http.post<BlogTopic>(
            `${environment.API_URL}/blog/topics`,
            topic,
            { headers }
        );
    }

    deleteTopic(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.API_URL}/blog/topics/${id}`);
    }

    getTopics(): Observable<BlogTopic[]> {
        return this.http.get<BlogTopic[]>(`${environment.API_URL}/blog/topics`);
    }

    updateTopic(topic: BlogTopic): Observable<BlogTopic> {
        const headers = this.contentTypeHeader();

        return this.http.put<BlogTopic>(
            `${environment.API_URL}/blog/topics/${topic.id}`,
            topic,
            { headers }
        );
    }
}
