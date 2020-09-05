import { Injectable } from '@angular/core';

import { BlogPost, BlogTopic, Profile, Project } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class ComparisonService {

    constructor() { }

    posts = (p1: BlogPost, p2: BlogPost) => {
        if(p1.updated_at < p2.updated_at) return 1;
        if(p1.updated_at > p2.updated_at) return -1;

        return 0;
    };

    projects = (p1: Project, p2: Project) => {
        if(p1.name > p2.name) return 1;
        if(p1.name < p2.name) return -1;

        return 0;
    };

    profiles = (p1: Profile, p2: Profile) => {
        if(p1.name > p2.name) return 1;
        if(p1.name < p2.name) return -1;
        
        return 0;
    };

    topics = (t1: BlogTopic, t2: BlogTopic) => {
        if(t1.name > t2.name) return 1;
        if(t1.name < t2.name) return -1;
        
        return 0;
    };
}
