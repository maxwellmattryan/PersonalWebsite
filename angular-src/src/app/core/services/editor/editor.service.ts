import { Injectable } from '@angular/core';

import { Post } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class EditorService {
    private post: Post;

    constructor() { }

    getPost(): Post {
        return this.post;
    }

    hasPost(): boolean {
        return this.post !== null;
    }

    setPost(post: Post): void {
        this.post = post;
    }
}
