import { Injectable } from '@angular/core';

import { Post, Project, Topic } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class EditorService {
    private post: Post;
    private project: Project;
    private topic: Topic;

    constructor() { }

    // POST
    getPost(): Post {
        return this.post;
    }

    hasPost(): boolean {
        return this.post != undefined;
    }

    setPost(post: Post): void {
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
    getTopic(): Topic {
        return this.topic;
    }

    hasTopic(): boolean {
        return this.topic != undefined;
    }

    setTopic(topic: Topic): void {
        this.topic = topic;
    }
}
