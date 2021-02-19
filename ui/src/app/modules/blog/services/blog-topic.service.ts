import { Injectable } from '@angular/core';

import { BlogTopic } from '../models';

@Injectable({
    providedIn: 'root'
})
export class BlogTopicService {
    private activeTopic: BlogTopic;

    constructor() { }

    getActiveTopicId(): number {
        if(!this.activeTopic) return -1;
        return this.activeTopic.id;
    }

    hasActiveTopic(): boolean {
        return this.activeTopic != null;
    }

    setActiveTopic(topic: BlogTopic): void {
        this.activeTopic = topic;
    }
}
