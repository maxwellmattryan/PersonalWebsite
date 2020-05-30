import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Post } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    constructor(
        private httpClient: HttpClient
    ) { }

    getPost(requestURL: string): Observable<Post> {
        return this.httpClient.get<Post>(environment.API_URL + requestURL);
    }

    getPosts(): Observable<Post[]> {
        return this.httpClient.get<Post[]>(environment.API_URL + '/blog/posts');
    }
}
