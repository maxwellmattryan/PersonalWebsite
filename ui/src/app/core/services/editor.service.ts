import { Injectable } from '@angular/core';

import { BlogPost, BlogTopic } from '@app/shared/models';
import { PortfolioProfile } from '@app/modules/portfolio/models';

@Injectable({
    providedIn: 'root'
})
export class EditorService {
    private post: BlogPost;
    private profile: PortfolioProfile;
    private topic: BlogTopic;

    constructor() { }

    // POST
    getPost(): BlogPost {
        return this.post;
    }

    hasPost(): boolean {
        return this.post !== undefined;
    }

    setPost(post: BlogPost): void {
        this.post = post;
    }

    // PROFILE
    getProfile(): PortfolioProfile {
        return this.profile;
    }

    hasProfile(): boolean {
        return this.profile !== undefined;
    }

    setProfile(profile: PortfolioProfile): void {
        this.profile = profile;
    }

    // PROJECT


    // TOPIC
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
