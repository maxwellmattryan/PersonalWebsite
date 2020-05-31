import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Post, Topic } from '../models';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    constructor(
        private httpClient: HttpClient,
    ) { }

    getPost(requestURL: string): Observable<Post> {
        return this.httpClient.get<Post>(environment.API_URL + requestURL);
    }

    getPosts(): Observable<Post[]> {
        return this.httpClient.get<Post[]>(environment.API_URL + '/blog/posts');
    }

    submitPost(post: Object, headers: HttpHeaders) {
        return this.httpClient.put(
            environment.API_URL + '/blog/posts/' + post['uri'], 
            post,
            { headers: headers }
        );
    }

    getTopic(requestURL: string): Observable<Topic> {
        return this.httpClient.get<Topic>(environment.API_URL + requestURL);
    }

    getTopics(): Observable<Topic[]> {
        return this.httpClient.get<Topic[]>(environment.API_URL + '/blog/topics');
    }
}
