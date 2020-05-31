import { Injectable } from '@angular/core';

import { Post } from '../models';

@Injectable({
    providedIn: 'root'
})
export class EditorService {
    private postData: Post;

    constructor() { }

    getPostData(): Post {
        return this.postData;
    }

    hasPostData(): boolean {
        return this.postData != null;
    }

    setPostData(post: Post): void {
        this.postData = post;
    }
}
