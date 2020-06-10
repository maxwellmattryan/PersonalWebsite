import { Component, OnInit } from '@angular/core';

import { Post } from 'models';
import { BlogService } from 'services';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
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
