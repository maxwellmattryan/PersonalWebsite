import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';

import { Post } from '../../models/post.model';

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
