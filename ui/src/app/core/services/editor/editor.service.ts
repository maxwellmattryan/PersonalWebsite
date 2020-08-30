import { Injectable } from '@angular/core';

import { BlogPost, BlogTopic, Project } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class EditorService {
    private post: BlogPost;
    private project: Project;
    private topic: BlogTopic;

    constructor() { }

    // POST
    getPost(): BlogPost {
        return this.post;
    }

    hasPost(): boolean {
        return this.post != undefined;
    }

    setPost(post: BlogPost): void {
        this.post = post;
    }

    // PROJECT
    getProject(): Project {
        return this.project;
    }

    hasProject(): boolean {
        return this.project != undefined;
    }

    setProject(project: Project): void {
        this.project = project;
    }

    // TOPIC
    getTopic(): BlogTopic {
        return this.topic;
    }

    hasTopic(): boolean {
        return this.topic != undefined;
    }

    setTopic(topic: BlogTopic): void {
        this.topic = topic;
    }
}
