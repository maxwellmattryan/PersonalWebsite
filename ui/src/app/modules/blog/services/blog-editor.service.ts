import { Injectable } from '@angular/core';

import { EditorService } from '@ui/core/services';

import { BlogPost, BlogTopic } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BlogEditorService extends EditorService {
    private post: BlogPost;
    private topic: BlogTopic;

    constructor() {
        super();
    }

    getPost(): BlogPost {
        return this.post;
    }

    hasPost(): boolean {
        return this.post !== undefined;
    }

    setPost(post: BlogPost): void {
        this.post = post;
    }

    getTopic(): BlogTopic {
        return this.topic;
    }

    hasTopic(): boolean {
        return this.topic !== undefined;
    }

    setTopic(topic: BlogTopic): void {
        this.topic = topic;
    }
}
