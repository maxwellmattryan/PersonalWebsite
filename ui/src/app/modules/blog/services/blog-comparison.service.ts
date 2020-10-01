import { Injectable } from '@angular/core';

import { ComparisonService } from '@ui/core/services';

import { BlogPost, BlogTopic } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BlogComparisonService extends ComparisonService {
    constructor() {
        super();
    }

    posts = (p1: BlogPost, p2: BlogPost) => {
        if(p1.updated_at < p2.updated_at) return 1;
        if(p1.updated_at > p2.updated_at) return -1;

        return 0;
    };

    topics = (t1: BlogTopic, t2: BlogTopic) => {
        if(t1.name > t2.name) return 1;
        if(t1.name < t2.name) return -1;

        return 0;
    };
}