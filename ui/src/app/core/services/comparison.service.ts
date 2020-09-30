import { Injectable } from '@angular/core';

import { BlogPost, BlogTopic } from '@ui/modules/blog/models';
import { PortfolioProfile, PortfolioProfileTechnology, PortfolioProject } from '@ui/modules/portfolio/models';

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

    projects = (p1: PortfolioProject, p2: PortfolioProject) => {
        if(p1.name > p2.name) return 1;
        if(p1.name < p2.name) return -1;

        return 0;
    };

    profiles = (p1: PortfolioProfile, p2: PortfolioProfile) => {
        if(p1.name > p2.name) return 1;
        if(p1.name < p2.name) return -1;
        
        return 0;
    };

    profileTechnologies = (pt1: PortfolioProfileTechnology, pt2: PortfolioProfileTechnology) => {
        if(pt1.display_order > pt2.display_order) return 1;
        if(pt1.display_order < pt2.display_order) return -1;

        return 0;
    };

    topics = (t1: BlogTopic, t2: BlogTopic) => {
        if(t1.name > t2.name) return 1;
        if(t1.name < t2.name) return -1;
        
        return 0;
    };
}
