import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service'
import { environment } from '../../environments/environment';
import { Post } from '../models/post.model';
import { Topic } from '../models/topic.model';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    constructor(
        private authService: AuthService,
        private httpClient: HttpClient
    ) { }

    getPosts(): Observable<Post[]> {
        return this.httpClient.get(environment.API_URL + '/blog/posts')
            .pipe(
                map((res: any) => res.posts.map(post => new Post().deserialize(post)))
            );
    }

    getTopics() {
        return this.httpClient.get<any>(environment.API_URL + '/blog/topics')
            .pipe(map((res: any) => {
                if(res.topics) {
                    return res.topics.map(topic => new Topic().deserialize(topic));
                } else {
                    return res;
                }
            }));
    }

    submitPost(post: any) {
        return this.httpClient.put(environment.API_URL + '/blog/posts/' + post.title, post, { headers: this.authService.getAuthHeaders() })
            .pipe(map((res: any) => res));
    }
}
