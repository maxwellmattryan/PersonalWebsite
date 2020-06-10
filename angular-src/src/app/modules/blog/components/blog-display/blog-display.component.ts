import { Component, OnInit } from '@angular/core';

import { Post } from 'models';
import { BlogService } from 'services';

@Component({
    selector: 'app-blog-display',
    templateUrl: './blog-display.component.html',
    styleUrls: ['./blog-display.component.scss']
})
export class BlogDisplayComponent implements OnInit {
    posts: Array<Post>;

    constructor(
        private blogService: BlogService
    ) { }

    ngOnInit(): void {
        this.blogService.getPosts().subscribe(posts => {
            this.posts = posts;
        });
    }
}