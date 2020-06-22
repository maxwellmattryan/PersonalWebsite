import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private activeTopic: string = 'All';

    constructor() { }

    getActiveTopic(): string {
        return this.activeTopic;
    }

    setActiveTopic(topic: string): void {
        this.activeTopic = topic;
    }
}
