import { Component, OnInit } from '@angular/core';

import { Post } from 'models';

import { BlogService, NotificationService } from 'services';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
    posts: Array<Post>;

    constructor(
        private blogService: BlogService,
        private notificationService: NotificationService,
    ) { }

    ngOnInit(): void {
        this.blogService.getPosts().subscribe(posts => {
            this.posts = posts;
        });
    }
}
