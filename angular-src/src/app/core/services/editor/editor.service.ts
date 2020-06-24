import { Injectable } from '@angular/core';

import { Post, Topic } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class EditorService {
    private post: Post;
    private topic: Topic;

    constructor() { }

    getPost(): Post {
        return this.post;
    }

    hasPost(): boolean {
        return this.post != null;
    }

    setPost(post: Post): void {
        this.post = post;
    }

    getTopic(): Topic {
        return this.topic;
    }

    hasTopic(): boolean {
        return this.topic != null;
    }

    setTopic(topic: Topic): void {
        this.topic = topic;
    }
}
