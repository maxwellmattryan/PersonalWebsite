import { Injectable } from '@angular/core';
import { Topic, Profile } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class ComparisonService {

    constructor() { }

    profiles = (p1: Profile, p2: Profile) => {
        if(p1.name > p2.name) return 1;
        if(p1.name < p2.name) return -1;
        
        return 0;
    };

    topics = (t1: Topic, t2: Topic) => {
        if(t1.name > t2.name) return 1;
        if(t1.name < t2.name) return -1;
        
        return 0;
    };
}
