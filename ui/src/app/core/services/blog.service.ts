import { Injectable } from '@angular/core';

import { BlogTopic } from '@ui/shared/models';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private activeTopic: BlogTopic;

    constructor() { }

    getActiveTopicId(): number {
        if(!this.activeTopic) return -1;
        return this.activeTopic.id;
    }

    hasActiveTopic(): boolean {
        return (this.activeTopic !== undefined);
    }

    setActiveTopic(topic: BlogTopic): void {
        this.activeTopic = topic;
    }
}
